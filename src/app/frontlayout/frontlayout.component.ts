import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router,RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-frontlayout',
  imports: [LoginComponent,RouterLink,RouterModule],
  templateUrl: './frontlayout.component.html',
  styleUrls: ['./frontlayout.component.css']
})
export class FrontlayoutComponent {
    constructor(private router: Router) {}

  isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }
}
