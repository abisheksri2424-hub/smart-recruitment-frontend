import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

export interface EmployerApplicant {
  applicationId: number;
  jobSeekerProfileId: number;
  fullName: string;
  location: string;
  yearsOfExperience: number;
  educationLevel: number;
  skills: string[];
  matchScore: number;
  status: number;
  appliedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getJobApplications(
    jobId: number
  ): Observable<EmployerApplicant[]> {

    return this.http.get<EmployerApplicant[]>(
      `${this.apiUrl}/jobs/${jobId}/applications`,
      {
        headers: this.getHeaders()
      }
    );
  }

  updateApplicationStatus(
    applicationId: number,
    status: number
  ): Observable<any> {

    return this.http.patch(
      `${this.apiUrl}/applications/${applicationId}/status`,
      {
        status: status
      },
      {
        headers: this.getHeaders()
      }
    );
  }

  getApplicationCv(
    applicationId: number
  ): Observable<Blob> {

    return this.http.get(
      `${this.apiUrl}/applications/${applicationId}/cv`,
      {
        headers: this.getHeaders(),
        responseType: 'blob'
      }
    );
  }
}