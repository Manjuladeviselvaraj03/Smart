import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  register!: FormGroup;

  constructor(private fb: FormBuilder , public data:DataserviceService,private router:Router ) {}
  ngOnInit() {
    this.register = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]
      ],
      password: [
        '',
        [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]
      ],
      phoneno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }
  get f() {
    return this.register.controls;
  }

  onSubmit() {
    
    if (this.register.valid) {
      const requestBody = {
        name: this.register.value.name,
        email: this.register.value.email,
        password: this.register.value.password,
        phoneNumber: this.register.value.phoneno
      };

      this.data.registerUser(requestBody).subscribe({
        next: (response) => {
          console.log('Response received:', response);
          if (response.status === 'Success') {
            console.log('User created successfully');
            alert('Registration successful! You can now log in.');
             this.router.navigate(['/login']);
          } else {
            alert(response.message);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Unable to hit the server. The server may be down.');
        }
      });
    } else {
      console.log('Form is invalid');
      Object.keys(this.register.controls).forEach(key => {
        this.register.get(key)?.markAsTouched();
      });
      alert('Please fill in all fields correctly before submitting.');
    }
  }
}
