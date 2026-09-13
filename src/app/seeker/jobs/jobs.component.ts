import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  JobService,
  DiscoveredJob
} from '../../services/job.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {

  jobs: DiscoveredJob[] = [];

  searchText = '';
  locationText = '';

  loading = false;
  errorMessage = '';

  constructor(
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {

    this.loading = true;
    this.errorMessage = '';

    this.jobService
      .discoverJobs(
        this.searchText,
        this.locationText
      )
      .subscribe({
        next: (data) => {
          this.jobs = data;
          this.loading = false;
        },

        error: (error) => {
          console.error(error);

          this.errorMessage =
            'Unable to load jobs.';

          this.loading = false;
        }
      });
  }

  searchJobs(): void {
    this.loadJobs();
  }

  clearSearch(): void {
    this.searchText = '';
    this.locationText = '';

    this.loadJobs();
  }
}