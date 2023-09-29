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

public links = [{ name: 'Book New Meetings', path: '/meeting/book-meeting' }, { name: 'Change Upcoming Meetings', path: '/meeting/edit-meeting' },
                { name: 'View All Your Meetings', path: '/meeting/view-meeting' }];
public isUserAdmin = false;
public isUserClient = false;
  clientDashboard: any;

constructor(
private authService: ClientAuthService,
private meetingService: MeetingService 

) {
  this.clientDashboard ={};
}


ngOnInit() {
  const currentUser = this.authService.getCurrentUser();

  if (currentUser && currentUser.client_username) {
    this.role = currentUser.role;
    this.clientFirstName = currentUser.first_name;
    let observable: Observable<Meeting[]>;

    observable = this.meetingService.getUpcomingMeetings(currentUser.client_username, this.role);
    observable.subscribe(
      (response: Meeting[]) => {
        console.log('Fetched meetings: ', response); // For debugging
        this.upcomingMeetings = response.map((meeting: Meeting) => ({
          ...meeting,
          status: 'upcoming', // You may need to set this based on your logic
          remainingTime: '',  // You may need to set this based on your logic
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



private calculateRemainingTime() {
  this.upcomingMeetings.forEach(meeting => {
    const meetingStartTime = new Date(meeting.date + 'T' + meeting.start_time);
    const meetingEndTime = new Date(meeting.date + 'T' + meeting.end_time);
    const currentTime = new Date();

    if (currentTime < meetingStartTime) {
      // Meeting is upcoming
      const remainingTimeInMilliseconds = meetingStartTime.getTime() - currentTime.getTime();
      meeting.status = 'upcoming';
      meeting.remainingTime = this.msToTime(remainingTimeInMilliseconds);
    } else if (currentTime < meetingEndTime) {
      // Meeting is ongoing
      const remainingTimeInMilliseconds = meetingEndTime.getTime() - currentTime.getTime();
      meeting.status = 'ongoing';
      meeting.remainingTime = this.msToTime(remainingTimeInMilliseconds);
    } else {
      // Meeting has ended
      meeting.status = 'ended';
      meeting.remainingTime = 'Meeting has ended';
    }
  });
}



private msToTime(duration: number): string {
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
  const hoursStr = hours > 0 ? hours + ' hour' + (hours > 1 ? 's ' : ' ') : '';
  const minutesStr = minutes > 0 ? minutes + ' minute' + (minutes > 1 ? 's' : '') : '';
  
  return hoursStr + minutesStr;
}

logout() {
  console.log('Logout method called.');
  this.authService.logout();
}
}