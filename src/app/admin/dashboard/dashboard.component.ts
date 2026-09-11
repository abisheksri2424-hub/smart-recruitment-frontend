import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  totalUsers = 0;
  totalVacancies = 0;
  totalApplications = 0;

  errorMessage = '';

  constructor(
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.adminService.getDashboard().subscribe({
      next: (response: any) => {
        this.totalUsers = response.totalUsers ?? 0;
        this.totalVacancies = response.totalVacancies ?? 0;
        this.totalApplications = response.totalApplications ?? 0;
      },
      error: () => {
        this.errorMessage = 'Failed to load admin dashboard.';
      }
    });
  }
}