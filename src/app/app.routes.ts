import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import {
  DashboardComponent as SeekerDashboardComponent
} from './seeker/dashboard/dashboard.component';

import {
  ProfileComponent
} from './seeker/profile/profile.component';

import {
  NotificationsComponent
} from './seeker/notifications/notifications.component';

import {
  ContactRequestsComponent
} from './seeker/contact-requests/contact-requests.component';

import {
  DashboardComponent as AdminDashboardComponent
} from './admin/dashboard/dashboard.component';

import {
  UsersComponent
} from './admin/users/users.component';

import { authGuard } from './core/guards/auth.guard';
import { seekerGuard } from './core/guards/seeker.guard';
import { adminGuard } from './core/guards/admin.guard';

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
    component: SeekerDashboardComponent,
    canActivate: [
      authGuard,
      seekerGuard
    ]
  },

  {
    path: 'seeker/profile',
    component: ProfileComponent,
    canActivate: [
      authGuard,
      seekerGuard
    ]
  },

  {
    path: 'seeker/notifications',
    component: NotificationsComponent,
    canActivate: [
      authGuard,
      seekerGuard
    ]
  },

  {
    path: 'seeker/contact-requests',
    component: ContactRequestsComponent,
    canActivate: [
      authGuard,
      seekerGuard
    ]
  },

  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [
      authGuard,
      adminGuard
    ]
  },

  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [
      authGuard,
      adminGuard
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];