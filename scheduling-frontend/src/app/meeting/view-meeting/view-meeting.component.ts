import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../meeting.model';



@Component({
  selector: 'view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.scss']
})
export class ViewMeetingComponent implements OnInit {
  meeting: Meeting | null = null;

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.meetingService.getMeeting(id).subscribe(
          (meeting: Meeting) => this.meeting = meeting,
          (error: any) => console.error(error)
        );
      }
    });
  }
}
