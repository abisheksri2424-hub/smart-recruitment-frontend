import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/Auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password
    });
  }

  registerJobSeeker(
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    return this.http.post(`${this.apiUrl}/register/job-seeker`, {
      fullName,
      email,
      password,
      confirmPassword
    });
  }

  registerEmployer(
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    return this.http.post(`${this.apiUrl}/register/employer`, {
      fullName,
      email,
      password,
      confirmPassword
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}