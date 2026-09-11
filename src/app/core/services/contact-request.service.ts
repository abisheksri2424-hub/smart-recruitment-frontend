import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactRequestService {

  private apiUrl = 'http://localhost:5000/api/contact-requests';

  constructor(private http: HttpClient) {}

  createContactRequest(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getMyContactRequests() {
    return this.http.get<any[]>(`${this.apiUrl}/mine`);
  }

  respondToRequest(id: number, data: any) {
    return this.http.patch(
      `${this.apiUrl}/${id}/respond`,
      data
    );
  }
}