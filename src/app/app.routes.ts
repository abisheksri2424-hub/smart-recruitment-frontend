import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { DashboardComponent } from './seeker/dashboard/dashboard.component';
import { JobsComponent } from './seeker/jobs/jobs.component';
import { JobDetailsComponent } from './seeker/job-details/job-details.component';
import { ApplicationsComponent } from './seeker/applications/applications.component';
import { ProfileComponent } from './seeker/profile/profile.component';

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
    path: 'auth/login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'auth/register',
    component: RegisterComponent
  },

  {
    path: 'seeker/dashboard',
    component: DashboardComponent
  },

  {
    path: 'seeker/jobs',
    component: JobsComponent
  },

  {
    path: 'seeker/jobs/:jobId',
    component: JobDetailsComponent
  },

  {
    path: 'seeker/applications',
    component: ApplicationsComponent
  },

  {
    path: 'seeker/profile',
    component: ProfileComponent
  }

];