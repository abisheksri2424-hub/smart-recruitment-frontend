import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  JobService,
  JobVacancy
} from '../../services/job.service';

@Component({
  selector: 'app-vacancy',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.css'
})
export class VacancyComponent implements OnInit {

  vacancies: JobVacancy[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadVacancies();
  }

  loadVacancies(): void {

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.jobService.getMyJobs().subscribe({

      next: (data) => {
        this.vacancies = data;
        this.loading = false;
      },

      error: (error) => {
        console.error(error);

        this.errorMessage =
          'Unable to load vacancies.';

        this.loading = false;
      }

    });
  }

  closeVacancy(jobId: number): void {

    const confirmed = confirm(
      'Are you sure you want to close this vacancy?'
    );

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.jobService.closeJob(jobId).subscribe({

      next: () => {

        this.successMessage =
          'Vacancy closed successfully.';

        this.loadVacancies();
      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          'Unable to close vacancy.';
      }

    });
  }
}