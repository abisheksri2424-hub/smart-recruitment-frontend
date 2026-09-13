import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobVacancy {
  id: number;
  employerProfileId: number;
  title: string;
  description: string;
  location: string | null;
  minimumExperienceYears: number;
  requiredEducationLevel: number;
  status: number;
  createdAt: string;
  updatedAt: string | null;
  requiredSkills: string[];
}

export interface DiscoveredJob {
  jobId: number;
  title: string;
  description: string;
  location: string;
  companyName: string;
  minimumExperienceYears: number;
  requiredEducationLevel: string;
  requiredSkills: string[];
  matchScore: number;
  skillsScore?: number;
  experienceScore?: number;
  educationScore?: number;
  locationScore?: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export interface MyApplication {
  applicationId: number;
  jobVacancyId: number;
  jobTitle: string;
  companyName: string;
  matchScore: number;
  status: number;
  appliedAt: string;
  updatedAt: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private jobsApiUrl = 'http://localhost:5000/api/Jobs';
  private applicationsApiUrl = 'http://localhost:5000/api/applications';

  constructor(private http: HttpClient) {}

  // =========================
  // EMPLOYER
  // =========================

  getMyJobs(): Observable<JobVacancy[]> {
    return this.http.get<JobVacancy[]>(
      `${this.jobsApiUrl}/mine`
    );
  }

  createJob(jobData: any): Observable<any> {
    return this.http.post<any>(
      this.jobsApiUrl,
      jobData
    );
  }

  getJobById(jobId: number): Observable<JobVacancy> {
    return this.http.get<JobVacancy>(
      `${this.jobsApiUrl}/${jobId}`
    );
  }

  updateJob(
    jobId: number,
    jobData: any
  ): Observable<any> {
    return this.http.put<any>(
      `${this.jobsApiUrl}/${jobId}`,
      jobData
    );
  }

  closeJob(jobId: number): Observable<any> {
    return this.http.patch<any>(
      `${this.jobsApiUrl}/${jobId}/close`,
      {}
    );
  }

  // =========================
  // JOB SEEKER
  // =========================

  discoverJobs(
    search: string = '',
    location: string = ''
  ): Observable<DiscoveredJob[]> {

    return this.http.get<DiscoveredJob[]>(
      `${this.jobsApiUrl}/discover`,
      {
        params: {
          Search: search,
          Location: location
        }
      }
    );
  }

  getJobMatch(
    jobId: number
  ): Observable<DiscoveredJob> {

    return this.http.get<DiscoveredJob>(
      `${this.jobsApiUrl}/${jobId}/match`
    );
  }

  applyJob(jobId: number): Observable<any> {
    return this.http.post<any>(
      `${this.jobsApiUrl}/${jobId}/apply`,
      {}
    );
  }

  getMyApplications(): Observable<MyApplication[]> {
    return this.http.get<MyApplication[]>(
      `${this.applicationsApiUrl}/mine`
    );
  }
}