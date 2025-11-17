import { Routes } from '@angular/router';
import { FrontlayoutComponent } from '../module/frontlayout/frontlayout.component';
import { RegisterComponent } from '../module/register/register.component';
import { LoginComponent } from '../module/login/login.component';
import { DashboardComponent } from '../module/dashboard/dashboard.component';
import { authGuard } from '../core/guards/auth.guard';
import { AboutComponent } from '../module/about/about.component';
import { ContactComponent } from '../module/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: FrontlayoutComponent,

    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
        
      },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      
    ],
  },
];
