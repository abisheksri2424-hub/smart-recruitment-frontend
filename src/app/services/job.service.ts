import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:5022/api/jobs';

  constructor(private http: HttpClient) {}

  getJobs(search: string = ''): Observable<any[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(
      `${this.apiUrl}/discover`,
      {
        headers,
        params: {
          Search: search
        }
      }
    );
  }

  getJobMatch(jobId: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(
      `${this.apiUrl}/${jobId}/match`,
      { headers }
    );
  }

  applyJob(jobId: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(
      `${this.apiUrl}/${jobId}/apply`,
      {},
      { headers }
    );
  }
  getMyApplications(): Observable<any[]> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<any[]>(
    'http://localhost:5022/api/applications/mine',
    { headers }
  );
}
}