import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-create-vacancy',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-vacancy.component.html',
  styleUrl: './create-vacancy.component.css'
})
export class CreateVacancyComponent {

  title = '';
  description = '';
  location = '';
  minimumExperienceYears = 0;
  requiredEducationLevel = 0;
  requiredSkills = '';

  loading = false;
  errorMessage = '';

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  createVacancy(): void {

    this.errorMessage = '';

    const skills = this.requiredSkills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    const vacancy = {
      title: this.title,
      description: this.description,
      location: this.location,
      minimumExperienceYears:
        Number(this.minimumExperienceYears),
      requiredEducationLevel:
        Number(this.requiredEducationLevel),
      requiredSkills: skills
    };

    this.loading = true;

    this.jobService.createJob(vacancy).subscribe({

      next: () => {
        this.loading = false;

        this.router.navigate([
          '/employer/vacancy'
        ]);
      },

      error: (error) => {
        console.error(error);

        this.loading = false;
        this.errorMessage =
          'Unable to create vacancy.';
      }

    });
  }
}