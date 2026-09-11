import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:5000/api/Notifications';

  constructor(private http: HttpClient) {}

  getNotifications() {
    return this.http.get<any[]>(this.apiUrl);
  }

  markAsRead(notificationId: number) {
    return this.http.patch(
      `${this.apiUrl}/${notificationId}/read`,
      {}
    );
  }
}