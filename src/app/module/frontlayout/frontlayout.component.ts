import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  NavigationEnd,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { DataserviceService } from '../../sharedResource/dataservice.service';

@Component({
  selector: 'app-frontlayout',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './frontlayout.component.html',
  styleUrls: ['./frontlayout.component.css'],
})
export class FrontlayoutComponent implements OnInit {
  isLoggedIn = false;
  userData: any = null;
  currentRoute: string = '';
  topEvents: any[] = [];
  user: any;

  constructor(public router: Router, public dataService: DataserviceService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
        this.checkAuthStatus();
      });
  }

  ngOnInit(): void {
    this.checkAuthStatus();
    this.currentRoute = this.router.url;
    this.loadTopEvents();

    this.user = this.dataService.getUserData();
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
            description:
              'Join us for an exciting annual college tech fest with coding battles, AI challenges, and project expos.',
            startingDate: 'Dec 15, 2025',
          },
          {
            id: 2,
            title: 'AI & ML Webinar',
            description:
              'Learn the latest trends in AI and ML with top industry experts',
            startingDate: 'Nov 15, 2025',
          },
          {
            id: 3,
            title: 'Startup Connect Meetup',
            description:
              'Network with entrepreneurs, investors, and leaders in this startup community meet.',
            startingDate: 'Dec 8, 2025',
          },
        ];
      },
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
    if (route === '/') {
      return this.currentRoute === '/' || this.currentRoute === '/home';
    }
    return (
      this.currentRoute === route || this.currentRoute.startsWith(route + '/')
    );
  }

  logout(): void {
    this.dataService.logout();
    this.isLoggedIn = false;
    this.userData = null;
    this.router.navigate(['/']);
  }
}
