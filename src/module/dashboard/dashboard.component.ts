import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../sharedResource/dataservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventlabelComponent } from '../eventlabel/eventlabel.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, EventlabelComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isLoggedIn = false;
  userData: any = null;

  activeTab: 'events' | 'meetups' | 'myevents' = 'events';

  searchQuery: string = '';
  selectedLocation: string = '';
  availableLocations: string[] = [];

  allEvents: any[] = [];
  allMeetups: any[] = [];
  userRegisteredEvents: any[] = [];
  filteredItems: any[] = [];

  showConfirmModal = false;
  selectedEventForRegistration: any = null;
  selectedEventType: 'event' | 'meetup' = 'event';

  isDropdownOpen = false;

  constructor(public dataService: DataserviceService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.dataService.isLoggedIn;
    this.userData = this.dataService.getUserData();

    if (!this.userData) {
      this.isLoggedIn = false;
    }

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
      },
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
      },
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
        },
      });
    }
  }

  switchTab(tab: 'events' | 'meetups' | 'myevents') {
    this.activeTab = tab;
    this.searchQuery = '';
    this.selectedLocation = '';

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

    if (this.activeTab === 'events') {
      items = [...this.allEvents];
    } else if (this.activeTab === 'meetups') {
      items = [...this.allMeetups];
    } else {
      items = [...this.userRegisteredEvents];
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
      );
    }

    if (this.selectedLocation) {
      items = items.filter((item) => item.location === this.selectedLocation);
    }

    this.filteredItems = items;

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

    const locations = this.filteredItems.map((item) => item.location);
    this.availableLocations = [...new Set(locations)].sort();
  }

  onSearch() {
    this.filterItems();
  }

  onLocationChange() {
    this.filterItems();
  }

  toggleDropdown(event: Event) {
    this.isDropdownOpen = !this.isDropdownOpen;

    if (this.isDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeDropdownOnClickOutside);
      }, 0);
    }
  }

  closeDropdownOnClickOutside = () => {
    this.isDropdownOpen = false;
    document.removeEventListener('click', this.closeDropdownOnClickOutside);
  };

  selectLocation(location: string) {
    this.selectedLocation = location;
    this.isDropdownOpen = false;
    this.onLocationChange();
    document.removeEventListener('click', this.closeDropdownOnClickOutside);
  }

  onRegisterEvent(event: any) {
    this.selectedEventForRegistration = event;

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
        eventType: this.selectedEventType,
      };

      this.dataService.registerEvent(registrationData).subscribe({
        next: (response) => {
          if (response.status === 'Success') {
            this.closeConfirmModal();
            alert(response.message);

            this.loadUserEvents();
          } else {
            this.closeConfirmModal();
            alert(response.message);
          }
        },
        error: (error) => {
          this.closeConfirmModal();
          alert('Unable to complete registration. Please try again later.');
          console.error('Registration error:', error);
        },
      });
    }
  }

  logout(): void {
    this.dataService.clearUserData();
    this.isLoggedIn = false;
    this.userData = null;
  }
}
