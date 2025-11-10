import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, NavigationEnd } from '@angular/router';
import { DataserviceService } from '../dataservice.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-frontlayout',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './frontlayout.component.html',
  styleUrls: ['./frontlayout.component.css']
})
export class FrontlayoutComponent implements OnInit {
  isLoggedIn = false;
  userData: any = null;
  currentRoute: string = '';
  topEvents: any[] = [];

  constructor(
    public router: Router,
    public dataService: DataserviceService
  ) {
    // Subscribe to route changes to update active link and check auth status
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
      // Check authentication status on each navigation
      this.checkAuthStatus();
    });
  }

  ngOnInit(): void {
    this.checkAuthStatus();
    this.currentRoute = this.router.url;
    this.loadTopEvents();
  }

  loadTopEvents(): void {
    this.dataService.getTopEvents().subscribe({
      next: (response) => {
        this.topEvents = response.slice(0, 3);
      },
      error: (error) => {
        console.error('Error loading top events:', error);
        // Fallback to mock data on error
        this.topEvents = [
          {
            id: 1,
            title: 'TechFest 2025',
            description: 'Join us for an exciting annual college tech fest with coding battles, AI challenges, and project expos.',
            startingDate: 'Dec 15, 2025'
          },
          {
            id: 2,
            title: 'AI & ML Webinar',
            description: 'Learn the latest trends in AI and ML with top industry experts',
            startingDate: 'Nov 15, 2025'
          },
          {
            id: 3,
            title: 'Startup Connect Meetup',
            description: 'Network with entrepreneurs, investors, and leaders in this startup community meet.',
            startingDate: 'Dec 8, 2025'
          }
        ];
      }
    });
  }

  checkAuthStatus(): void {
    this.isLoggedIn = this.dataService.isLoggedIn;
    this.userData = this.dataService.getUserData();
    
    if (!this.userData) {
      this.isLoggedIn = false;
    }
  }

  isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }

  isActiveRoute(route: string): boolean {
    // For home route, only match exact path
    if (route === '/') {
      return this.currentRoute === '/' || this.currentRoute === '/home';
    }
    // For other routes, match route and sub-routes
    return this.currentRoute === route || this.currentRoute.startsWith(route + '/');
  }

  logout(): void {
    this.dataService.clearUserData();
    this.isLoggedIn = false;
    this.userData = null;
    this.router.navigate(['/login']);
  }

  getUserInitials(): string {
    if (!this.userData?.name) return 'U';
    const names = this.userData.name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }

  onAboutClick(): void {
    alert('About page clicked!');
  }

  onContactClick(): void {
    alert('Contact us page clicked!');
  }

  onEventClick(event: any): void {
    // If not logged in, redirect to login
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      // If logged in, navigate to dashboard
      this.router.navigate(['/dashboard']);
    }
  }
}
