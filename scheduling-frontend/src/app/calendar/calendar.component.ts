/* calendar/calendar.component.ts */





import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import { PluginDef } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Availability } from './availability.model';
import { addMonths } from 'date-fns';

type CalendarEvent = {
  title: string;
  start: Date | string;
  end?: Date | string;
  backgroundColor: string;
  borderColor: string;
};



@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})



export class CalendarComponent implements OnInit, OnChanges {
  @Input() availability: Availability[] = [];

  calendarPlugins: PluginDef[] = [dayGridPlugin];
  calendarEvents: CalendarEvent[] = [];

  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    eventContent: function(arg: any) {
      const startTime = arg.event.start ? arg.event.start.toTimeString().slice(0, 5) : '';
      const endTime = arg.event.end ? arg.event.end.toTimeString().slice(0, 5) : '';
      const html = `
        <div class="fc-event-main">
          ${arg.event.title} <br>
          ${startTime ? `${startTime} - ${endTime}` : ''}
        </div>`;
      return { html };
    }
  };

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    const today = new Date();
    const twoMonthsLater = addMonths(today, 2);
    const dateRange = { start: today.toISOString(), end: twoMonthsLater.toISOString() };

    this.calendarService.getUnexpiredAvailabilities(dateRange).subscribe(
      (data: Availability[]) => {
        this.availability = data;
        this.updateCalendarEvents();
      },
      (error: any) => {
        console.error(error);
      }
    );

    this.calendarService.getBookedSlots(dateRange).subscribe(
      (data: any[]) => {
        this.addBookedSlotsToCalendarEvents(data);
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
      end: availability.endDate,
      backgroundColor: 'gray',
      borderColor: '#12b12f'
    }));
  }

  private addBookedSlotsToCalendarEvents(bookedSlots: any[]): void {
    const bookedCalendarEvents = bookedSlots.map(slot => ({
      title: 'Booked',
      start: slot.date + ' ' + slot.start_time,
      end: slot.date + ' ' + slot.end_time,
      backgroundColor: 'gray',
      borderColor: '#ff0000'
    }));
    this.calendarEvents = [...this.calendarEvents, ...bookedCalendarEvents];
  }


}