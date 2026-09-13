import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { DashboardComponent as SeekerDashboardComponent } from './seeker/dashboard/dashboard.component';
import { ProfileComponent } from './seeker/profile/profile.component';
import { JobsComponent } from './seeker/jobs/jobs.component';
import { ApplicationsComponent } from './seeker/applications/applications.component';
import { NotificationsComponent } from './seeker/notifications/notifications.component';
import { ContactRequestsComponent } from './seeker/contact-requests/contact-requests.component';

import { DashboardComponent as EmployerDashboardComponent } from './employer/dashboard/dashboard.component';
import { VacancyComponent } from './employer/vacancy/vacancy.component';
import { CreateVacancyComponent } from './employer/create-vacancy/create-vacancy.component';
import { EditVacancyComponent } from './employer/edit-vacancy/edit-vacancy.component';
import { ApplicantsComponent } from './employer/applicants/applicants.component';

import { DashboardComponent as AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';

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

  // JOB SEEKER
  {
    path: 'seeker/dashboard',
    component: SeekerDashboardComponent,
    canActivate: [authGuard, seekerGuard]
  },
  {
    path: 'seeker/profile',
    component: ProfileComponent,
    canActivate: [authGuard, seekerGuard]
  },
  {
    path: 'seeker/jobs',
    component: JobsComponent,
    canActivate: [authGuard, seekerGuard]
  },
  {
    path: 'seeker/applications',
    component: ApplicationsComponent,
    canActivate: [authGuard, seekerGuard]
  },
  {
    path: 'seeker/notifications',
    component: NotificationsComponent,
    canActivate: [authGuard, seekerGuard]
  },
  {
    path: 'seeker/contact-requests',
    component: ContactRequestsComponent,
    canActivate: [authGuard, seekerGuard]
  },

  // EMPLOYER
  {
    path: 'employer/dashboard',
    component: EmployerDashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'employer/vacancy',
    component: VacancyComponent,
    canActivate: [authGuard]
  },
  {
    path: 'employer/create-vacancy',
    component: CreateVacancyComponent,
    canActivate: [authGuard]
  },
  {
    path: 'employer/edit-vacancy/:jobId',
    component: EditVacancyComponent,
    canActivate: [authGuard]
  },
  {
    path: 'employer/applicants/:jobId',
    component: ApplicantsComponent,
    canActivate: [authGuard]
  },

  // ADMIN
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [authGuard, adminGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];