import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../sharedResource/dataservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventlabelComponent } from '../eventlabel/eventlabel.component';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, EventlabelComponent, ToastModule],
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

  constructor(
    public dataService: DataserviceService,
    private messageService: MessageService
  ) {}

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
        if (this.activeTab === 'events') this.filterItems();
      },
      error: () => {
        this.showError('Failed to load events');
      },
    });
  }

  loadAllMeetups() {
    this.dataService.getAllMeetups().subscribe({
      next: (response) => {
        this.allMeetups = response;
        if (this.activeTab === 'meetups') this.filterItems();
      },
      error: () => {
        this.showError('Failed to load meetups');
      },
    });
  }

  loadUserEvents() {
    if (!this.userData?.name) return;

    this.dataService.getUserEvents(this.userData.name).subscribe({
      next: (response) => {
        this.userRegisteredEvents = response;
        if (this.activeTab === 'myevents') this.filterItems();
      },
      error: () => {
        this.showError('Failed to load your registrations');
      },
    });
  }

  switchTab(tab: 'events' | 'meetups' | 'myevents') {
    this.activeTab = tab;
    this.searchQuery = '';
    this.selectedLocation = '';

    if (tab === 'events') this.loadAllEvents();
    else if (tab === 'meetups') this.loadAllMeetups();
    else this.loadUserEvents();

    this.filterItems();
  }

  filterItems() {
    let items: any[] = [];

    if (this.activeTab === 'events') items = [...this.allEvents];
    else if (this.activeTab === 'meetups') items = [...this.allMeetups];
    else items = [...this.userRegisteredEvents];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q)
      );
    }

    if (this.selectedLocation) {
      items = items.filter((i) => i.location === this.selectedLocation);
    }

    this.filteredItems = items;
    this.updateAvailableLocations();
  }

  updateAvailableLocations() {
    let items =
      this.activeTab === 'events'
        ? this.allEvents
        : this.activeTab === 'meetups'
        ? this.allMeetups
        : this.userRegisteredEvents;

    const locations = this.filteredItems.map((i) => i.location);
    this.availableLocations = [...new Set(locations)].sort();
  }

  toggleDropdown(event: Event) {
    this.isDropdownOpen = !this.isDropdownOpen;

    if (this.isDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeDropdownOnClickOutside);
      });
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
  }

  onLocationChange() {
    this.filterItems();
  }

  onSearch() {
    this.filterItems();
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
    if (!this.selectedEventForRegistration || !this.userData) return;

    const data = {
      username: this.userData.name,
      eventId: this.selectedEventForRegistration.id,
      eventType: this.selectedEventType,
    };

    this.dataService.registerEvent(data).subscribe({
      next: (response) => {
        this.closeConfirmModal();

        if (response.status === 'Success') {
          this.showSuccess(response.message);
          this.loadUserEvents();
        } else {
          this.showWarn(response.message);
        }
      },
      error: () => {
        this.closeConfirmModal();
        this.showError('Unable to complete registration.');
      },
    });
  }

  logout() {
    this.dataService.clearUserData();
    this.isLoggedIn = false;
    this.userData = null;
    this.showSuccess('Logged out successfully');
  }

  showSuccess(msg: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: msg,
    });
  }

  showWarn(msg: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: msg,
    });
  }

  showError(msg: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: msg,
    });
  }
}
