import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit {

  applications: any[] = [];
  errorMessage = '';

  constructor(
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.errorMessage = '';

    this.jobService.getMyApplications().subscribe({
      next: (data) => {
        this.applications = data ?? [];
      },
      error: () => {
        this.errorMessage = 'Failed to load applications.';
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