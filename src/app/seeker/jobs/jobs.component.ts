import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JobService } from '../../services/job.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {

  jobs: any[] = [];

  searchTerm = '';

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.jobService
      .getJobs(this.searchTerm)
      .subscribe({

        next: (response) => {

          this.jobs = response ?? [];

          this.loading = false;

          this.jobs.forEach(job => {
            this.loadMatch(job);
          });
        },

        error: (error) => {

          console.error(error);

          this.jobs = [];
          this.loading = false;

          this.errorMessage =
            'Failed to load jobs.';
        }

      });
  }

  loadMatch(job: any): void {

    this.jobService
      .getJobMatch(job.jobId)
      .subscribe({

        next: (match) => {

          job.matchScore =
            match?.matchScore ?? 0;

          job.missingSkills =
            match?.missingSkills ?? [];
        },

        error: (error) => {

          console.error(error);

          job.matchScore =
            job.matchScore ?? 0;

          job.missingSkills =
            job.missingSkills ?? [];
        }

      });
  }

  searchJobs(): void {
    this.loadJobs();
  }

  clearSearch(): void {

    this.searchTerm = '';

    this.loadJobs();
  }

  applyJob(jobId: number): void {

    this.successMessage = '';
    this.errorMessage = '';

    this.jobService
      .applyJob(jobId)
      .subscribe({

        next: () => {

          this.successMessage =
            'Job application submitted successfully.';
        },

        error: (error) => {

          console.error(error);

          if (error.status === 409) {

            this.errorMessage =
              'You have already applied for this job.';

          } else {

            this.errorMessage =
              error?.error?.message ||
              'Failed to apply for job.';
          }
        }

      });
  }
}