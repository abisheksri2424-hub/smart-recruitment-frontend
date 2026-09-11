import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  successMessage = '';
  errorMessage = '';

  constructor(
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response ?? [];
      },
      error: () => {
        this.errorMessage = 'Failed to load users.';
      }
    });
  }

  activateUser(userId: string) {
    this.clearMessages();

    this.adminService.activateUser(userId).subscribe({
      next: () => {
        this.successMessage = 'User activated successfully.';
        this.loadUsers();
      },
      error: () => {
        this.errorMessage = 'Failed to activate user.';
      }
    });
  }

  deactivateUser(userId: string) {
    this.clearMessages();

    this.adminService.deactivateUser(userId).subscribe({
      next: () => {
        this.successMessage = 'User deactivated successfully.';
        this.loadUsers();
      },
      error: () => {
        this.errorMessage = 'Failed to deactivate user.';
      }
    });
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}