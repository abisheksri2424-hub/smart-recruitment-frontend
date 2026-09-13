import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';

import { DashboardComponent } from './seeker/dashboard/dashboard.component';
import { JobsComponent } from './seeker/jobs/jobs.component';
import { ApplicationsComponent } from './seeker/applications/applications.component';
import { ProfileComponent } from './seeker/profile/profile.component';
import { JobDetailsComponent } from './seeker/job-details/job-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'login',
    redirectTo: 'auth/login',
    pathMatch: 'full'
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
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];