/* clent/client-dashboard.component.ts */


import { Component, OnInit } from '@angular/core';
import { ClientAuthService } from '../../core/services/client-auth.service';
import { MeetingService } from '../../meeting/meeting.service';
import { Meeting, UpcomingMeeting } from '../../meeting/meeting.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {
  upcomingMeetings: UpcomingMeeting[] = [];
  role: string | undefined;
  clientFirstName: string | undefined;

  public links = [
    { name: 'Book New Meetings', path: '/meeting/book-meeting' },
    { name: 'Change Upcoming Meetings', path: '/meeting/edit-meeting' },
    { name: 'View All Your Meetings', path: '/meeting/view-meeting' }
  ];
  public isUserAdmin = false;
  public isUserClient = false;

  constructor(
    private authService: ClientAuthService,
    private meetingService: MeetingService 
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.role = currentUser.role;
      this.clientFirstName = currentUser.first_name;

      // Update admin and client flags based on the user's role
      this.isUserAdmin = this.role === 'admin';
      this.isUserClient = this.role === 'client';

      // Only fetch meetings for clients, not for admins.
      if (this.isUserClient && currentUser.client_username) {
        let observable: Observable<Meeting[]>;

        observable = this.meetingService.getUpcomingMeetings(currentUser.client_username, this.role);
        observable.subscribe(
          (response: Meeting[]) => {
            console.log('Fetched meetings: ', response); 
            this.upcomingMeetings = response.map((meeting: Meeting) => ({
              ...meeting,
              status: 'upcoming',
              remainingTime: '',
            }));
    
            // Calculate remaining time for each meeting
            this.calculateRemainingTime();
          },
          (error: any) => {
            console.error('Error fetching meetings: ', error);
          }
        );
      }
    }
  }
  calculateRemainingTime() {
    throw new Error('Method not implemented.');
  }

  // ... (rest of the code remains unchanged)

  logout() {
    console.log('Logout method called.');
    this.authService.logout();
  }
}
