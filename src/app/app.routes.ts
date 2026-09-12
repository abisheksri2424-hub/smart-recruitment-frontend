import { Routes } from '@angular/router';

import { DashboardComponent } from './employer/dashboard/dashboard.component';
import { VacancyComponent } from './employer/vacancy/vacancy.component';
import { CreateVacancyComponent } from './employer/create-vacancy/create-vacancy.component';
import { ApplicantsComponent } from './employer/applicants/applicants.component';
import { EditVacancyComponent } from './employer/edit-vacancy/edit-vacancy.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: 'employer/dashboard',
    component: DashboardComponent
  },
  {
    path: 'employer/vacancies',
    component: VacancyComponent
  },
  {
    path: 'employer/vacancies/create',
    component: CreateVacancyComponent
  },
  {
    path: 'employer/vacancies/edit/:id',
    component: EditVacancyComponent
  },
  {
    path: 'employer/vacancies/:jobId/applicants',
    component: ApplicantsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];