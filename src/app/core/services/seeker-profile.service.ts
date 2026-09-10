import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeekerProfileService {

  private apiUrl = 'http://localhost:5000/api/job-seekers/me';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProfile() {
    return this.http.get(
      this.apiUrl,
      {
        headers: this.getHeaders()
      }
    );
  }

  updateProfile(profileData: any) {
    return this.http.put(
      this.apiUrl,
      profileData,
      {
        headers: this.getHeaders()
      }
    );
  }

  updateSkills(skills: string[]) {
    return this.http.put(
      `${this.apiUrl}/skills`,
      {
        skills
      },
      {
        headers: this.getHeaders()
      }
    );
  }

  uploadCv(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(
      `${this.apiUrl}/cv`,
      formData,
      {
        headers: this.getHeaders()
      }
    );
  }

  downloadCv() {
    return this.http.get(
      `${this.apiUrl}/cv`,
      {
        headers: this.getHeaders(),
        observe: 'response',
        responseType: 'blob'
      }
    );
  }

}