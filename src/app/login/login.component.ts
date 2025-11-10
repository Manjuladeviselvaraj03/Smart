import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FrontlayoutComponent } from '../frontlayout/frontlayout.component';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterLink,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { 
  email = '';
  password = '';

  constructor(private router: Router, private data: DataserviceService) {}

  onLogin() {
    if (this.email && this.password) {
      const requestBody = {
        email: this.email,
        password: this.password
      };

      this.data.loginUser(requestBody).subscribe({
        next: (response) => {
          console.log('Response received:', response);
          if (response.status === 'Success') {
            console.log('Login successful');
            // Store user data from response
            this.data.setUserData({
              name: response.username || response.name || this.email,
              email: this.email
            });
            this.router.navigate(['/dashboard']);
          } else {
            alert(response.message);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          const statusCode = error.status || 'Unknown';
          alert(`Unable to hit the server. The server may be down. (Status: ${statusCode})`);
        }
      });
    } else {
      alert('Please fill in all fields correctly before submitting.');
    }
  }
  
}
