import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit {

  applications: any[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getMyApplications().subscribe({
      next: (data) => {
        this.applications = data;
        console.log('Applications:', data);
      },
      error: (error) => {
        console.error('Failed to load applications:', error);
      }
    });
  }
  getStatusText(status: number): string {
  switch (status) {
    case 0:
      return 'Applied';

    case 1:
      return 'Under Review';

    case 2:
      return 'Accepted';

    case 3:
      return 'Rejected';

    default:
      return 'Unknown';
  }
}
}