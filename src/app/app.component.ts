import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { MeetupComponent } from './meetup/meetup.component';
import { RegisterComponent } from './register/register.component';
import { FrontlayoutComponent } from './frontlayout/frontlayout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,EventComponent,LoginComponent,MeetupComponent,RegisterComponent,FrontlayoutComponent,DashboardComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smartevent';
}
