import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataserviceService } from '../../sharedResource/dataservice.service';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private data: DataserviceService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (!this.loginForm.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Form',
        detail: 'Please fill in all fields correctly.',
      });
      this.loginForm.markAllAsTouched();
      return;
    }

    const requestBody = this.loginForm.value;

    this.data.loginUser(requestBody).subscribe({
      next: (response) => {
        if (response.status === 'Success') {
          const userObj = {
            name: response.username || response.name || requestBody.email,
            email: requestBody.email,
          };

          this.data.setUserData(userObj);

          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: 'Welcome back!',
          });

          this.router.navigate(['/dashboard']);
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Login Failed',
            detail: response.message,
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Server Error',
          detail: 'Unable to reach server. Try again later.',
        });
      },
    });
  }
}
