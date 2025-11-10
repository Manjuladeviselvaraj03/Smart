import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventlabelComponent } from '../eventlabel/eventlabel.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, EventlabelComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  isLoggedIn = false;
  userData: any = null;
  
  // Tab management
  activeTab: 'events' | 'meetups' | 'myevents' = 'events';
  
  // Search and filter
  searchQuery: string = '';
  selectedLocation: string = '';
  availableLocations: string[] = [];
  
  // Data arrays
  allEvents: any[] = [];
  allMeetups: any[] = [];
  userRegisteredEvents: any[] = [];
  filteredItems: any[] = [];
  
  // Registration modal
  showConfirmModal = false;
  selectedEventForRegistration: any = null;
  selectedEventType: 'event' | 'meetup' = 'event';
  
  // Custom dropdown
  isDropdownOpen = false;

  constructor(public dataService: DataserviceService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.dataService.isLoggedIn;
    this.userData = this.dataService.getUserData();
    
    if (!this.userData) {
      this.isLoggedIn = false;
    }
    
    // Load initial data
    this.loadAllEvents();
    this.loadAllMeetups();
    this.loadUserEvents();
    this.switchTab('events');
  }
  
  loadAllEvents() {
    this.dataService.getAllEvents().subscribe({
      next: (response) => {
        this.allEvents = response;
        if (this.activeTab === 'events') {
          this.filterItems();
        }
      },
      error: (error) => {
        console.error('Error loading events:', error);
        // Keep mock data as fallback
      }
    });
  }
  
  loadAllMeetups() {
    this.dataService.getAllMeetups().subscribe({
      next: (response) => {
        this.allMeetups = response;
        if (this.activeTab === 'meetups') {
          this.filterItems();
        }
      },
      error: (error) => {
        console.error('Error loading meetups:', error);
        // Keep mock data as fallback
      }
    });
  }
  
  loadUserEvents() {
    if (this.userData && this.userData.name) {
      this.dataService.getUserEvents(this.userData.name).subscribe({
        next: (response) => {
          this.userRegisteredEvents = response;
          if (this.activeTab === 'myevents') {
            this.filterItems();
          }
        },
        error: (error) => {
          console.error('Error loading user events:', error);
          // Keep mock data as fallback
        }
      });
    }
  }
  
  
  switchTab(tab: 'events' | 'meetups' | 'myevents') {
    this.activeTab = tab;
    this.searchQuery = '';
    this.selectedLocation = '';
    
    // Reload data when switching tabs
    if (tab === 'events') {
      this.loadAllEvents();
    } else if (tab === 'meetups') {
      this.loadAllMeetups();
    } else if (tab === 'myevents') {
      this.loadUserEvents();
    }
    
    this.filterItems();
  }
  
  filterItems() {
    let items: any[] = [];
    
    // Get current tab data
    if (this.activeTab === 'events') {
      items = [...this.allEvents];
    } else if (this.activeTab === 'meetups') {
      items = [...this.allMeetups];
    } else {
      items = [...this.userRegisteredEvents];
    }
    
    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by location
    if (this.selectedLocation) {
      items = items.filter(item => item.location === this.selectedLocation);
    }
    
    this.filteredItems = items;
    
    // Update available locations
    this.updateAvailableLocations();
  }
  
  updateAvailableLocations() {
    let items: any[] = [];
    
    if (this.activeTab === 'events') {
      items = this.allEvents;
    } else if (this.activeTab === 'meetups') {
      items = this.allMeetups;
    } else {
      items = this.userRegisteredEvents;
    }
    
    const locations = items.map(item => item.location);
    this.availableLocations = [...new Set(locations)].sort();
  }
  
  onSearch() {
    this.filterItems();
  }
  
  onLocationChange() {
    this.filterItems();
  }
  
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
    
    if (this.isDropdownOpen) {
      // Close dropdown when clicking outside
      setTimeout(() => {
        document.addEventListener('click', this.closeDropdownOnClickOutside);
      }, 0);
    }
  }
  
  closeDropdownOnClickOutside = () => {
    this.isDropdownOpen = false;
    document.removeEventListener('click', this.closeDropdownOnClickOutside);
  }
  
  selectLocation(location: string) {
    this.selectedLocation = location;
    this.isDropdownOpen = false;
    this.onLocationChange();
    document.removeEventListener('click', this.closeDropdownOnClickOutside);
  }
  
  onRegisterEvent(event: any) {
    this.selectedEventForRegistration = event;
    // Determine event type based on current active tab
    this.selectedEventType = this.activeTab === 'meetups' ? 'meetup' : 'event';
    this.showConfirmModal = true;
  }
  
  closeConfirmModal() {
    this.showConfirmModal = false;
    this.selectedEventForRegistration = null;
  }
  
  confirmRegistration() {
    if (this.selectedEventForRegistration && this.userData) {
      const registrationData = {
        username: this.userData.name,
        eventId: this.selectedEventForRegistration.id,
        eventType: this.selectedEventType
      };
      
      this.dataService.registerEvent(registrationData).subscribe({
        next: (response) => {
          if (response.status === 'Success') {
            this.closeConfirmModal();
            alert(response.message);
            
            // Reload user events from API after successful registration
            this.loadUserEvents();
          } else {
            // Error case - close popup and show error message
            this.closeConfirmModal();
            alert(response.message);
          }
        },
        error: (error) => {
          // Close popup and show error alert
          this.closeConfirmModal();
          alert('Unable to complete registration. Please try again later.');
          console.error('Registration error:', error);
        }
      });
    }
  }

  logout(): void {
    this.dataService.clearUserData();
    this.isLoggedIn = false;
    this.userData = null;
  }

  getUserInitials(): string {
    if (!this.userData?.name) return 'U';
    const names = this.userData.name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }
}