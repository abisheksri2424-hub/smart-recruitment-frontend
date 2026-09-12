import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-edit-vacancy',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-vacancy.component.html',
  styleUrl: './edit-vacancy.component.css'
})
export class EditVacancyComponent implements OnInit {

  jobId = 0;

  vacancy = {
    title: '',
    description: '',
    location: '',
    minimumExperienceYears: 0,
    requiredEducationLevel: 0
  };

  loading = false;
  saving = false;

  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit(): void {

    this.jobId =
      Number(this.route.snapshot.paramMap.get('id'));

    if (!this.jobId) {
      this.errorMessage = 'Invalid vacancy id.';
      return;
    }

    this.loadVacancy();
  }

  loadVacancy(): void {

    this.loading = true;
    this.errorMessage = '';

    this.jobService
      .getJobById(this.jobId)
      .subscribe({

        next: (data) => {

          this.vacancy = {
            title: data.title,
            description: data.description,
            location: data.location ?? '',
            minimumExperienceYears:
              data.minimumExperienceYears,
            requiredEducationLevel:
              data.requiredEducationLevel
          };

          this.loading = false;
        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to load vacancy.';

          this.loading = false;
        }

      });
  }

  updateVacancy(): void {

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.jobService
      .updateJob(
        this.jobId,
        this.vacancy
      )
      .subscribe({

        next: () => {

          this.saving = false;

          this.successMessage =
            'Vacancy updated successfully.';

          setTimeout(() => {
            this.router.navigate([
              '/employer/vacancies'
            ]);
          }, 1000);
        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to update vacancy.';

          this.saving = false;
        }

      });
  }
}