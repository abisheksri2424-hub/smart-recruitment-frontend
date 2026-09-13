import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  JobService,
  MyApplication
} from '../../services/job.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit {

  applications: MyApplication[] = [];

  loading = false;
  errorMessage = '';

  constructor(
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {

    this.loading = true;
    this.errorMessage = '';

    this.jobService.getMyApplications().subscribe({

      next: (data: MyApplication[]) => {
        this.applications = data;
        this.loading = false;
      },

      error: (error: any) => {
        console.error(
          'Failed to load applications:',
          error
        );

        if (error.status === 401) {
          this.errorMessage =
            'Please login again.';
        } else {
          this.errorMessage =
            'Unable to load applications.';
        }

        this.loading = false;
      }

    });
  }

  getStatusText(status: number): string {

    switch (status) {

      case 1:
        return 'Applied';

      case 2:
        return 'Under Review';

      case 3:
        return 'Shortlisted';

      case 4:
        return 'Accepted';

      case 5:
        return 'Rejected';

      default:
        return 'Unknown';
    }
  }
}