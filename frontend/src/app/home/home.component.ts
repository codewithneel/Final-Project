import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: any = null;       // Store user data
  announcements: any[] = [];  // Store all fetched announcements
  isAdmin: boolean = false;   // Check if user is an admin
  showCreateForm: boolean = false; // Toggle pop-up visibility
  newAnnouncement = { title: '', message: '' }; // Form inputs

  baseUrl = 'http://localhost:8080';

  constructor(
    private currentUserService: CurrentUserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Fetch user data and check admin status
    this.userData = this.currentUserService.getUserData();
    this.isAdmin = this.userData?.admin || false;

    // Fetch announcements if companies exist
    if (this.userData && this.userData.companies) {
      this.fetchAnnouncementsForCompanies(this.userData.companies);
    }
  }

  fetchAnnouncementsForCompanies(companies: any[]): void {
    companies.forEach(company => {
      this.http.get<any[]>(`${this.baseUrl}/company/${company.id}/announcements`).subscribe({
        next: (response) => {
          this.announcements.push(...response);
        },
        error: (error) => {
          console.error(`Error fetching announcements for company ${company.id}:`, error);
        }
      });
    });
  }

  // Submit new announcement
  createAnnouncement(): void {
    const companyId = this.userData?.companies[0]?.id; // Default to first company
    const payload = { title: this.newAnnouncement.title, message: this.newAnnouncement.message };

    this.http.post(`${this.baseUrl}/announcements/company/${companyId}/user/${this.userData.id}`, payload)
      .subscribe({
        next: (response) => {
          console.log('Announcement Created:', response);
          this.announcements.push(response); // Add to list
          this.showCreateForm = false; // Close the form
          this.newAnnouncement = { title: '', message: '' }; // Reset form
        },
        error: (error) => {
          console.error('Error creating announcement:', error);
        }
      });
  }
}
