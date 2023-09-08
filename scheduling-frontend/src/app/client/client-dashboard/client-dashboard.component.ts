/* clent/client-dashboard.component.ts */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ClientService } from '../client.service';
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

public links = [{ name: 'Link 1', path: '/path1' }, { name: 'Link 2', path: '/path2' }];
public isUserAdmin = false;
public isUserClient = false;
  clientDashboard: any;

constructor(
private authService: AuthService,
private clientService: ClientService
) {
  this.clientDashboard ={};
}

ngOnInit() {
const currentUser = this.authService.getCurrentUser();

if (currentUser && currentUser.username) {
  this.role = currentUser.role;
  this.clientFirstName = currentUser.first_name;
  let observable: Observable<Meeting[]>;
  if (this.role === 'admin') {
    observable = this.clientService.getAllMeetings();  // hypothetical method
  } else {
    observable = this.clientService.getUpcomingMeetings(currentUser.username ?? '');
  }

  observable.subscribe(
    (response: any) => {
      console.log('Fetched meetings: ', response);  // For debugging
      if (response && Array.isArray(response.data)) {  // Make sure response.data is an array
        this.upcomingMeetings = response.data as UpcomingMeeting[];
      }
    },
    (error: any) => {
      console.error('Error fetching meetings: ', error);
      // Handle errors gracefully
    }
  );
}
}

private calculateRemainingTime() {
this.upcomingMeetings.forEach(meeting => {
const meetingStartTime = new Date(meeting.date + 'T' + meeting.start_time);
const currentTime = new Date();
const remainingTimeInMilliseconds = meetingStartTime.getTime() - currentTime.getTime();

  // Convert remaining time from milliseconds to a more readable format (e.g., "2 hours 30 minutes")
  meeting.remainingTime = this.msToTime(remainingTimeInMilliseconds);
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

