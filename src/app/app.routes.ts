import { Routes } from '@angular/router';
import { FrontlayoutComponent } from './frontlayout/frontlayout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: FrontlayoutComponent,
        children: [
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent },
            { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }
        ]
    }
];
