import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataserviceService } from '../../sharedResource/dataservice.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  register!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public data: DataserviceService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.register = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
    });
  }

  get f() {
    return this.register.controls;
  }

  onSubmit() {
    if (this.register.valid) {
      const requestBody = this.register.value;

      this.data.registerUser(requestBody).subscribe({
        next: (response) => {
          console.log('Response received:', response);

          if (response.status === 'Success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Registration successful! You can now log in.',
            });

            this.router.navigate(['/login']);
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Warning',
              detail: response.message,
            });
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Server Error',
            detail: 'Unable to reach the server. Please try again later.',
          });
        },
      });
    } else {
      Object.keys(this.register.controls).forEach((key) => {
        this.register.get(key)?.markAsTouched();
      });

      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Form',
        detail: 'Please fill in all fields correctly.',
      });
    }
  }
}
