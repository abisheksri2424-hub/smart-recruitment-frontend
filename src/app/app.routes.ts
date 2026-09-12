import { Routes } from '@angular/router';

import { DashboardComponent } from './seeker/dashboard/dashboard.component';
import { JobsComponent } from './seeker/jobs/jobs.component';
import { ApplicationsComponent } from './seeker/applications/applications.component';
import { ProfileComponent } from './seeker/profile/profile.component';
import { JobDetailsComponent } from './seeker/job-details/job-details.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
     {
    path: 'seeker/dashboard',
    component: DashboardComponent
  },
  {
    path: 'seeker/jobs',
    component: JobsComponent
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
  path: 'seeker/jobs/:jobId',
  component: JobDetailsComponent
},
{
  path: 'auth/login',
  component: LoginComponent
},
];
