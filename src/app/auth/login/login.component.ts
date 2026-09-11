import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password.';
      return;
    }

    localStorage.removeItem('token');
    localStorage.removeItem('role');

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {

        const role = response.role;

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', role);

        if (role === 'JobSeeker') {
          this.router.navigate(['/seeker/dashboard']);
          return;
        }

        if (role === 'Employer') {
          this.router.navigate(['/employer/dashboard']);
          return;
        }

        if (role === 'Administrator' || role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
          return;
        }

        localStorage.removeItem('token');
        localStorage.removeItem('role');

        this.errorMessage = 'Unknown user role: ' + role;
      },

      error: (error) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        this.errorMessage =
          error?.error?.message ||
          'Invalid email or password.';
      }
    });
  }
}