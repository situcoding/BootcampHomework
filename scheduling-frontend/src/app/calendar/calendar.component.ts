/* calendar/calendar.component.ts */



import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import { PluginDef } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Availability } from './availability.model';

type CalendarEvent = {
  title: string;
  start: Date | string;
  backgroundColor: string;
  borderColor: string;
};

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() availability: Availability[] = []; // Changed the type from any[] to Availability[]

  calendarPlugins: PluginDef[] = [dayGridPlugin];
  calendarEvents: CalendarEvent[] = [];

  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.getUnexpiredAvailabilities().subscribe(
      (data: Availability[]) => {
        this.availability = data;
        // Update your calendar rendering logic here
        this.updateCalendarEvents();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('availability' in changes) {
      this.updateCalendarEvents();
    }
  }

  private updateCalendarEvents(): void {
    this.calendarEvents = this.availability.map(availability => ({
      title: 'Available',
      start: availability.date,
      backgroundColor: '#28a745',
      borderColor: '#28a745'
    }));
    console.log("Calendar Events:", this.calendarEvents);
  }
}
