import { Routes } from '@angular/router';
import { FrontlayoutComponent } from './frontlayout/frontlayout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

    {path:'register',component: RegisterComponent},
    {path:'login',component:LoginComponent},
    { path: '', component: FrontlayoutComponent },
    {path:'dashboard',component:DashboardComponent}
 
];
