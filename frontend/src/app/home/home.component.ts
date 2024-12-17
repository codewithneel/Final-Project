import { Component, OnInit } from '@angular/core';

interface Announcement {
  id: number;
  title: string;
  message: string;
  date: string;
  author: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  announcements: Announcement[] = [];

  ngOnInit(): void {
    // Dummy announcements for display
    this.announcements = [
      {
        id: 1,
        title: 'Welcome to the Company!',
        message: 'We are excited to have you on board. Let’s make great things happen.',
        date: '2024-12-17',
        author: 'Admin'
      },
      {
        id: 2,
        title: 'Holiday Schedule',
        message: 'Our offices will be closed from Dec 24th to Jan 2nd for the holidays.',
        date: '2024-12-15',
        author: 'HR Department'
      },
      {
        id: 3,
        title: 'System Maintenance',
        message: 'There will be scheduled maintenance on Dec 20th from 12:00 AM to 4:00 AM.',
        date: '2024-12-14',
        author: 'IT Support'
      }
    ];
  }
}
