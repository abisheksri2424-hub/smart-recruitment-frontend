import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  ApplicationService,
  EmployerApplicant
} from '../../services/application.service';

@Component({
  selector: 'app-applicants',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.css'
})
export class ApplicantsComponent implements OnInit {

  jobId = 0;

  applicants: EmployerApplicant[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {

    this.jobId = Number(
      this.route.snapshot.paramMap.get('jobId')
    );

    if (!this.jobId) {
      this.errorMessage = 'Invalid job id.';
      return;
    }

    this.loadApplicants();
  }

  loadApplicants(): void {

    this.loading = true;
    this.errorMessage = '';

    this.applicationService
      .getJobApplications(this.jobId)
      .subscribe({

        next: (data) => {
          this.applicants = data;
          this.loading = false;
        },

        error: (error) => {
          console.error(error);

          this.errorMessage =
            'Unable to load applicants.';

          this.loading = false;
        }

      });
  }

  getStatusText(status: number): string {

    switch (status) {
      case 1:
        return 'Applied';

      case 2:
        return 'Reviewed';

      case 3:
        return 'Shortlisted';

      case 4:
        return 'Rejected';

      default:
        return 'Unknown';
    }
  }

  shortlist(applicant: EmployerApplicant): void {

    this.updateStatus(
      applicant.applicationId,
      3
    );
  }

  reject(applicant: EmployerApplicant): void {

    this.updateStatus(
      applicant.applicationId,
      4
    );
  }

  updateStatus(
    applicationId: number,
    status: number
  ): void {

    this.errorMessage = '';
    this.successMessage = '';

    this.applicationService
      .updateApplicationStatus(
        applicationId,
        status
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Application status updated successfully.';

          this.loadApplicants();
        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to update application status.';
        }

      });
  }

  viewCv(applicant: EmployerApplicant): void {

    this.applicationService
      .getApplicationCv(
        applicant.applicationId
      )
      .subscribe({

        next: (file) => {

          const fileUrl =
            URL.createObjectURL(file);

          window.open(
            fileUrl,
            '_blank'
          );

          setTimeout(() => {
            URL.revokeObjectURL(fileUrl);
          }, 10000);
        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to open CV.';
        }

      });
  }
}