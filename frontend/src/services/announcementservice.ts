import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private baseUrl = 'http://localhost:8080'; // Adjust as needed for the backend API

  constructor(private http: HttpClient) { }

  // Return raw JSON instead of strict AnnouncementDto[]
  getAnnouncements(companyId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/company/${companyId}/announcements`);
  }
}

