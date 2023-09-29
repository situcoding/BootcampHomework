/* shared/navbar/navbar.component.ts */

import { Component, OnInit } from '@angular/core';
import { ClientAuthService } from '../../core/services/client-auth.service'; // Adjust the path as needed
import { MeetingService } from 'src/app/meeting/meeting.service'; // Adjust the path as needed


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  links = [
    { name: 'Home', path: '/home' },
    { name: 'Profile', path: '/profile' },
    // add more links here
  ];

  currentUser: { username?: string; role?: string; } | null | undefined;

  upcomingMeetings: any[] = []; // Declare the variable for upcoming meetings

  constructor(private authService: ClientAuthService, private meetingService: MeetingService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    // Retrieve upcoming meetings using the meetingService
    if (this.currentUser?.role === 'client') {
      this.meetingService.getUpcomingMeetings(this.currentUser.username || '', this.currentUser.role || '').subscribe(meetings => {
        this.upcomingMeetings = meetings;
      });
    }
  }

  logout() {
    this.authService.logout();
  }


  get isUserAdmin(): boolean {
    return this.currentUser?.role === 'admin_user' || this.currentUser?.role === 'admin_master';
  }

  get isUserClient(): boolean {
    return this.currentUser?.role === 'client';
  }
}