import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-create-vacancy',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-vacancy.component.html',
  styleUrl: './create-vacancy.component.css'
})
export class CreateVacancyComponent {

  vacancy = {
    title: '',
    description: '',
    location: '',
    minimumExperienceYears: 0,
    requiredEducationLevel: 0
  };

  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  submitForm(): void {

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.jobService.createJob(this.vacancy).subscribe({

      next: () => {
        this.loading = false;
        this.successMessage =
          'Vacancy created successfully.';

        setTimeout(() => {
          this.router.navigate([
            '/employer/vacancies'
          ]);
        }, 1000);
      },

      error: (error) => {
        console.error(error);

        this.loading = false;

        this.errorMessage =
          'Unable to create vacancy.';
      }

    });
  }
}