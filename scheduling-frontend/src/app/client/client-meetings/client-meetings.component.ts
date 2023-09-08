
/* client/client-meetings/client-meetings.component.ts */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from 'src/app/meeting/meeting.model';
import { MeetingService } from 'src/app/meeting/meeting.service';

@Component({
  selector: 'client-meetings',
  templateUrl: './client-meetings.component.html',
  styleUrls: ['./client-meetings.component.scss']
})
export class ClientMeetingsComponent implements OnInit {
  meeting: Meeting | null = null;
  meetings: Meeting[] = [];

  constructor(private route: ActivatedRoute, private meetingService: MeetingService) {}

  ngOnInit(): void {
    // Subscribe to route params
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        // Fetch a single meeting
        this.meetingService.getMeeting(id).subscribe(
          (meeting: any) => this.meeting = meeting,
          (error: any) => console.error(error)
        );
      } else {
        const username = 'someUsername';
        const role = 'someRole';
        // Fetch all upcoming meetings
        this.meetingService.getUpcomingMeetings(username, role).subscribe(
          (meetings: Meeting[]) => this.meetings = meetings,
          (error: any) => console.error(error)
        );
      }
    });
  }
}
