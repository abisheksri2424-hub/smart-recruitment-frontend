import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {

  job: any;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {

    const jobId = Number(
      this.route.snapshot.paramMap.get('jobId')
    );

    this.jobService.getJobMatch(jobId).subscribe({
      next: (data) => {
        this.job = data;
        console.log('Job Match:', data);
      },

      error: (error) => {
        console.error('Failed to load job match:', error);
      }
    });

  }

  applyJob() {
  const jobId = Number(
    this.route.snapshot.paramMap.get('jobId')
  );

  this.jobService.applyJob(jobId).subscribe({
    next: () => {
      alert('Application submitted successfully!');
    },

    error: (error) => {
      if (error.status === 409) {
        alert('You have already applied for this job.');
      } else if (error.status === 401) {
        alert('Please login again.');
      } else {
        alert('Failed to apply for job.');
      }
    }
  });
}
}