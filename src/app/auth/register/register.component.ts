import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    if (this.role === 'JobSeeker') {
      this.authService.registerJobSeeker(
        this.fullName,
        this.email,
        this.password,
        this.confirmPassword
      ).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (error) => console.log('Registration failed:', error)
      });
    }

    if (this.role === 'Employer') {
      this.authService.registerEmployer(
        this.fullName,
        this.email,
        this.password,
        this.confirmPassword
      ).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (error) => console.log('Registration failed:', error)
      });
    }
  }
}