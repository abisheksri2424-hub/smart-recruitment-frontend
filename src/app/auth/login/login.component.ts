import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  private apiUrl = 'http://localhost:5000/api/Auth/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(): void {
    this.errorMessage = '';

    this.http.post<any>(
      this.apiUrl,
      {
        email: this.email,
        password: this.password
      }
    ).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        if (response.role === 'JobSeeker') {
          this.router.navigate(['/seeker/dashboard']);
        }
      },

      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          'Login failed.';
      }
    });
  }
}