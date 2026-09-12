import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {

  jobs: any[] = [];
  searchText = '';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getJobs(this.searchText).subscribe({
      next: (data) => {
        this.jobs = data;
        console.log('Jobs:', data);
      },
      error: (error) => {
        console.error('Failed to load jobs:', error);
      }
    });
  }

  searchJobs(): void {
    this.loadJobs();
  }
}