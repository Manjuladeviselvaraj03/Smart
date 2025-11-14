import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { FrontlayoutComponent } from './frontlayout/frontlayout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';


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
