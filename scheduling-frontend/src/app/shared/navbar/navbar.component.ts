/* shared/navbar/navbar.component.ts */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'; // Adjust the path as needed
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
  
  upcomingMeetings: any[] = []; /* Declare the variable */

  constructor(private authService: AuthService, private meetingService: MeetingService) {}
  
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.meetingService.fetchMeetings().subscribe(meetings => { // Use the injected service
      this.upcomingMeetings = meetings;
    }); // Missing closing parenthesis is added
  }

  logout() {
    /* Logic to logout */
  }

  get isUserAdmin(): boolean {
    return this.currentUser?.role === 'admin_user' || this.currentUser?.role === 'admin_master';
  }

  get isUserClient(): boolean {
    return this.currentUser?.role === 'client';
  }
}
