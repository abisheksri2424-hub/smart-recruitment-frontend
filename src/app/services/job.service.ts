import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:5000/api/Jobs';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getMyJobs(): Observable<JobVacancy[]> {
    return this.http.get<JobVacancy[]>(
      `${this.apiUrl}/mine`,
      {
        headers: this.getHeaders()
      }
    );
  }

  createJob(jobData: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      jobData,
      {
        headers: this.getHeaders()
      }
    );
  }

  getJobById(jobId: number): Observable<JobVacancy> {
    return this.http.get<JobVacancy>(
      `${this.apiUrl}/${jobId}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  updateJob(
    jobId: number,
    jobData: any
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${jobId}`,
      jobData,
      {
        headers: this.getHeaders()
      }
    );
  }

  closeJob(jobId: number): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${jobId}/close`,
      {},
      {
        headers: this.getHeaders()
      }
    );
  }
}