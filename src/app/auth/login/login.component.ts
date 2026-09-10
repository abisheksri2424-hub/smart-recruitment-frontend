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

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        if (response.role === 'JobSeeker') {
          this.router.navigate(['/seeker/dashboard']);
        } else if (response.role === 'Employer') {
          this.router.navigate(['/employer/dashboard']);
        } else if (response.role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
        }
      },

      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Invalid email or password.';
      }
    });
  }
}