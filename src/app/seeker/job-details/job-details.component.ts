import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {

  jobId = 0;

  job: any = null;
  match: any = null;

  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.jobId = Number(
      this.route.snapshot.paramMap.get('jobId')
    );

    if (!this.jobId) {
      this.router.navigate(['/seeker/jobs']);
      return;
    }

    this.loadJobDetails();
  }

  loadJobDetails(): void {
    this.errorMessage = '';

    forkJoin({
      job: this.jobService.getJob(this.jobId),
      match: this.jobService.getJobMatch(this.jobId)
    }).subscribe({
      next: (response) => {
        this.job = response.job;
        this.match = response.match;
      },
      error: () => {
        this.errorMessage =
          'Failed to load job details.';
      }
    });
  }

  applyJob(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.jobService.applyJob(this.jobId).subscribe({
      next: () => {
        this.successMessage =
          'Job application submitted successfully.';
      },

      error: (error) => {
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

  backToJobs(): void {
    this.router.navigate(['/seeker/jobs']);
  }
}