import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FrontlayoutComponent } from '../frontlayout/frontlayout.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterLink,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { 
  email = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.email && this.password) {
      alert('Login Successful!');
      this.router.navigate(['/dashboard']);
    }
  }
  
}
