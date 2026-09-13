import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {
  JobService,
  DiscoveredJob
} from '../../services/job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {

  job: DiscoveredJob | null = null;

  loading = false;
  errorMessage = '';
  applyMessage = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    const jobId = Number(
      this.route.snapshot.paramMap.get('jobId')
    );

    this.loadJob(jobId);
  }

  loadJob(jobId: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.jobService.getJobMatch(jobId).subscribe({
      next: (data) => {
        this.job = data;
        this.loading = false;
      },

      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to load job details.';
        this.loading = false;
      }
    });
  }

  applyJob(): void {
    if (!this.job) {
      return;
    }

    this.applyMessage = '';

    this.jobService.applyJob(this.job.jobId).subscribe({
      next: () => {
        this.applyMessage =
          'Application submitted successfully!';
      },

      error: (error) => {
        if (error.status === 409) {
          this.applyMessage =
            'You have already applied for this job.';
        } else if (error.status === 401) {
          this.applyMessage =
            'Please login again.';
        } else {
          this.applyMessage =
            'Unable to apply for this job.';
        }
      }
    });
  }
}