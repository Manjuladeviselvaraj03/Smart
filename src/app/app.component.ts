import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { MeetupComponent } from './meetup/meetup.component';
import { RegisterComponent } from './register/register.component';
import { FrontlayoutComponent } from './frontlayout/frontlayout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeetregisterComponent } from './meetregister/meetregister.component';
import { EventregisterComponent } from './eventregister/eventregister.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,EventComponent,LoginComponent,MeetupComponent,RegisterComponent,FrontlayoutComponent,DashboardComponent,MeetregisterComponent,EventregisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smartevent';
    constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
