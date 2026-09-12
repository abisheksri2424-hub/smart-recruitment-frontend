import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  private apiUrl = 'http://localhost:5022/api/Auth/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>(this.apiUrl, loginData).subscribe({
      next: (response) => {

        localStorage.setItem('token', response.token);

        console.log('Login successful');

        this.router.navigate(['/seeker/jobs']);
      },

      error: (error) => {
        this.errorMessage = 'Invalid email or password';
        console.error(error);
      }
    });

  }
}