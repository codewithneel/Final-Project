import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnnouncementDto } from 'src/app/models/announcement.dto';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private baseUrl = 'http://localhost:8080';  // Adjust as needed for the backend API

  constructor(private http: HttpClient) { }

  getAnnouncements(companyId: number): Observable<AnnouncementDto[]> {
    return this.http.get<AnnouncementDto[]>(`${this.baseUrl}/company/${companyId}/announcements`);
  }
}
