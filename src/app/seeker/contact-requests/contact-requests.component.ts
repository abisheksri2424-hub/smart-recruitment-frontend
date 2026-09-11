import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRequestService } from '../../core/services/contact-request.service';

@Component({
  selector: 'app-contact-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-requests.component.html',
  styleUrl: './contact-requests.component.css'
})
export class ContactRequestsComponent implements OnInit {

  contactRequests: any[] = [];

  successMessage = '';
  errorMessage = '';

  constructor(
    private contactRequestService: ContactRequestService
  ) {}

  ngOnInit() {
    this.loadContactRequests();
  }

  loadContactRequests() {
    this.contactRequestService.getMyContactRequests().subscribe({
      next: (response) => {
        this.contactRequests = response;
      },
      error: () => {
        this.errorMessage = 'Failed to load contact requests.';
      }
    });
  }

  acceptRequest(id: number) {
    this.respond(id, 2);
  }

  declineRequest(id: number) {
    this.respond(id, 3);
  }

  respond(id: number, status: number) {
    this.successMessage = '';
    this.errorMessage = '';

    this.contactRequestService
      .respondToRequest(id, { status })
      .subscribe({
        next: () => {
          this.successMessage =
            'Contact request updated successfully.';

          this.loadContactRequests();
        },
        error: () => {
          this.errorMessage =
            'Failed to update contact request.';
        }
      });
  }

  getStatus(status: number) {
    if (status === 1) {
      return 'Pending';
    }

    if (status === 2) {
      return 'Accepted';
    }

    if (status === 3) {
      return 'Declined';
    }

    return 'Unknown';
  }
}