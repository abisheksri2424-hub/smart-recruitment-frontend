import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
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

  private apiUrl = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient
  ) {}

  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // =========================
  // EMPLOYER
  // =========================

  getMyJobs(): Observable<JobVacancy[]> {

    return this.http.get<JobVacancy[]>(
      `${this.apiUrl}/Jobs/mine`,
      {
        headers: this.getHeaders()
      }
    );
  }

  createJob(
    jobData: any
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/Jobs`,
      jobData,
      {
        headers: this.getHeaders()
      }
    );
  }

  getJobById(
    jobId: number
  ): Observable<JobVacancy> {

    return this.http.get<JobVacancy>(
      `${this.apiUrl}/Jobs/${jobId}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  getJob(
    jobId: number
  ): Observable<JobVacancy> {

    return this.getJobById(jobId);
  }

  updateJob(
    jobId: number,
    jobData: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/Jobs/${jobId}`,
      jobData,
      {
        headers: this.getHeaders()
      }
    );
  }

  closeJob(
    jobId: number
  ): Observable<any> {

    return this.http.patch(
      `${this.apiUrl}/Jobs/${jobId}/close`,
      {},
      {
        headers: this.getHeaders()
      }
    );
  }

  // =========================
  // JOB SEEKER
  // =========================

  getJobs(
    search: string = ''
  ): Observable<any[]> {

    let params = new HttpParams();

    if (search.trim()) {
      params = params.set(
        'Search',
        search.trim()
      );
    }

    return this.http.get<any[]>(
      `${this.apiUrl}/jobs/discover`,
      {
        headers: this.getHeaders(),
        params
      }
    );
  }

  getJobMatch(
    jobId: number
  ): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/jobs/${jobId}/match`,
      {
        headers: this.getHeaders()
      }
    );
  }

  applyJob(
    jobId: number
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/jobs/${jobId}/apply`,
      {},
      {
        headers: this.getHeaders()
      }
    );
  }

  getMyApplications(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/applications/mine`,
      {
        headers: this.getHeaders()
      }
    );
  }
}