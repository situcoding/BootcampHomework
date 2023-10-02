/* meeting/book/book.component.ts */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MeetingService } from '../meeting.service';
import { Meeting, MeetingType } from '../meeting.model';

@Component({
  selector: 'book-meeting',
  templateUrl: './book-meeting.component.html',
  styleUrls: ['./book-meeting.component.scss']
})
export class BookMeetingComponent implements OnInit {
  meetingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private meetingService: MeetingService
  ) {}

  ngOnInit() {
    this.meetingForm = this.fb.group({
      date: '',
      start_time: '',
      end_time: '',
      time_zone: '',
      location: '',
      meeting_type: MeetingType.Internal, /* Use the enum here */
      subject: '',
      attendees: '',
      host: '',
      co_host: '',
      notes: ''
    });
  }

  bookMeeting() {
    const meeting: Meeting = this.meetingForm.value;
    this.meetingService.bookMeeting(meeting).subscribe(
      res => {
        console.log('Meeting booked successfully', res);
        /* Handle successful booking */
      },
      err => {
        console.error('Error booking meeting', err);
        /* Handle errors */
      }
    );
  }
}
  
