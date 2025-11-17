import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { LoginComponent } from '../module/login/login.component';

import { RegisterComponent } from '../module/register/register.component';
import { FrontlayoutComponent } from '../module/frontlayout/frontlayout.component';
import { DashboardComponent } from '../module/dashboard/dashboard.component';
import { ContactComponent } from '../module/contact/contact.component';
import { AboutComponent } from '../module/about/about.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoginComponent,FrontlayoutComponent,DashboardComponent,ContactComponent,AboutComponent],
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
