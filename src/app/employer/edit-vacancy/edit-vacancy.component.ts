import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  JobService,
  JobVacancy
} from '../../services/job.service';

@Component({
  selector: 'app-edit-vacancy',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-vacancy.component.html',
  styleUrl: './edit-vacancy.component.css'
})
export class EditVacancyComponent implements OnInit {

  jobId = 0;

  vacancy: JobVacancy = {
    id: 0,
    employerProfileId: 0,
    title: '',
    description: '',
    location: '',
    minimumExperienceYears: 0,
    requiredEducationLevel: 0,
    status: 0,
    createdAt: '',
    updatedAt: null,
    requiredSkills: []
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

    const id =
      this.route.snapshot.paramMap.get('jobId') ??
      this.route.snapshot.paramMap.get('id');

    this.jobId = Number(id);

    if (!this.jobId || this.jobId <= 0) {
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

          this.vacancy = data;

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

    this.errorMessage = '';
    this.successMessage = '';
    this.saving = true;

    const jobData = {
      title: this.vacancy.title,
      description: this.vacancy.description,
      location: this.vacancy.location,
      minimumExperienceYears:
        Number(this.vacancy.minimumExperienceYears),
      requiredEducationLevel:
        Number(this.vacancy.requiredEducationLevel),
      requiredSkills:
        this.vacancy.requiredSkills ?? []
    };

    this.jobService
      .updateJob(
        this.jobId,
        jobData
      )
      .subscribe({

        next: () => {

          this.saving = false;

          this.successMessage =
            'Vacancy updated successfully.';

          setTimeout(() => {
            this.router.navigate([
              '/employer/vacancy'
            ]);
          }, 700);
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