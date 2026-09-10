import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeekerProfileService } from '../../core/services/seeker-profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  fullName = '';
  location = '';
  yearsOfExperience = 0;
  educationLevel = 0;
  summary = '';

  skills: string[] = [];
  newSkill = '';

  selectedCv: File | null = null;

  successMessage = '';
  errorMessage = '';

  constructor(
    private seekerProfileService: SeekerProfileService
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.clearMessages();

    this.seekerProfileService.getProfile().subscribe({
      next: (response: any) => {
        this.fullName = response.fullName ?? '';
        this.location = response.location ?? '';
        this.yearsOfExperience = response.yearsOfExperience ?? 0;
        this.educationLevel = response.educationLevel ?? 0;
        this.summary = response.summary ?? '';
        this.skills = response.skills ?? [];
      },
      error: () => {
        this.errorMessage = 'Failed to load profile.';
      }
    });
  }

  saveProfile() {
    this.clearMessages();

    const profileData = {
      fullName: this.fullName,
      location: this.location,
      yearsOfExperience: this.yearsOfExperience,
      educationLevel: this.educationLevel,
      summary: this.summary
    };

    this.seekerProfileService.updateProfile(profileData).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully.';
      },
      error: () => {
        this.errorMessage = 'Profile update failed.';
      }
    });
  }

  addSkill() {
    const skill = this.newSkill.trim();

    if (skill && !this.skills.includes(skill)) {
      this.skills.push(skill);
      this.newSkill = '';
    }
  }

  removeSkill(skill: string) {
    this.skills = this.skills.filter(item => item !== skill);
  }

  saveSkills() {
    this.clearMessages();

    this.seekerProfileService.updateSkills(this.skills).subscribe({
      next: () => {
        this.successMessage = 'Skills updated successfully.';
      },
      error: () => {
        this.errorMessage = 'Skills update failed.';
      }
    });
  }

  onCvSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedCv = input.files[0];
    }
  }

  uploadCv() {
    this.clearMessages();

    if (!this.selectedCv) {
      this.errorMessage = 'Please select a CV file.';
      return;
    }

    this.seekerProfileService.uploadCv(this.selectedCv).subscribe({
      next: () => {
        this.successMessage = 'CV uploaded successfully.';
        this.selectedCv = null;
      },
      error: () => {
        this.errorMessage = 'CV upload failed.';
      }
    });
  }

  downloadCv() {
    this.clearMessages();

    this.seekerProfileService.downloadCv().subscribe({
      next: (response) => {
        if (!response.body) {
          this.errorMessage = 'CV not found.';
          return;
        }

        const contentDisposition =
          response.headers.get('content-disposition');

        let fileName = 'cv';

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^"]+)"?/);

          if (match && match[1]) {
            fileName = match[1];
          }
        }

        const url = window.URL.createObjectURL(response.body);
        const link = document.createElement('a');

        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);

        this.successMessage = 'CV downloaded successfully.';
      },
      error: () => {
        this.errorMessage = 'CV download failed.';
      }
    });
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}