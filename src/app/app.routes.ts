import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { DashboardComponent } from './seeker/dashboard/dashboard.component';
import { ProfileComponent } from './seeker/profile/profile.component';
import { NotificationsComponent } from './seeker/notifications/notifications.component';

import { authGuard } from './core/guards/auth.guard';
import { seekerGuard } from './core/guards/seeker.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'seeker/dashboard',
    component: DashboardComponent,
    canActivate: [authGuard, seekerGuard]
  },
  {
    path: 'seeker/profile',
    component: ProfileComponent,
    canActivate: [authGuard, seekerGuard]
  },
  {
    path: 'seeker/notifications',
    component: NotificationsComponent,
    canActivate: [authGuard, seekerGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];