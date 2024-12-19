import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from '../current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  announcements: any[] = [];
  currentCompanyId: number | null = null;
  isAdmin: boolean = false;
  showCreateForm: boolean = false;
  newAnnouncement = { title: '', message: '' }; // Form inputs

  baseUrl = 'http://localhost:8080';

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if(this.currentUserService.getSharedloggedIN()==false)
    {
      this.router.navigate(['']); 
    }
    this.currentCompanyId = +this.currentUserService.getCurrentCompany(); // Convert to number
    console.log('Current Company ID:', this.currentCompanyId);

    const userData = this.currentUserService.getUserData();
    this.isAdmin = userData?.admin || false;

    if (this.currentCompanyId) {
      this.fetchAnnouncements(this.currentCompanyId);
    } else {
      console.warn('No current company selected.');
    }
  }

  fetchAnnouncements(companyId: number): void {
    this.http.get<any[]>(`${this.baseUrl}/company/${companyId}/announcements`).subscribe({
      next: (response) => {
        console.log(`Announcements for company ${companyId}:`, response);
        this.announcements = response;
      },
      error: (error) => {
        console.error(`Error fetching announcements for company ${companyId}:`, error);
      }
    });
  }

  // Submit new announcement
  createAnnouncement(): void {
    if (!this.currentCompanyId) {
      console.error('No company selected for creating an announcement.');
      return;
    }

    const payload = { title: this.newAnnouncement.title, message: this.newAnnouncement.message };

    this.http.post(`${this.baseUrl}/announcements/company/${this.currentCompanyId}/user/${this.currentUserService.getUserData()?.id}`, payload)
      .subscribe({
        next: (response) => {
          console.log('Announcement Created:', response);
          this.announcements.push(response);
          this.showCreateForm = false;
          this.newAnnouncement = { title: '', message: '' };
        },
        error: (error) => {
          console.error('Error creating announcement:', error);
        }
      });
  }
}
