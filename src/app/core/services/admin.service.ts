import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:5000/api/Admin';

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }

  getUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  activateUser(userId: string) {
    return this.http.patch(
      `${this.apiUrl}/users/${userId}/activate`,
      {}
    );
  }

  deactivateUser(userId: string) {
    return this.http.patch(
      `${this.apiUrl}/users/${userId}/deactivate`,
      {}
    );
  }
}