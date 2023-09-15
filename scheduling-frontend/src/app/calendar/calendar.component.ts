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
    timeZone: 'America/Los_Angeles', 
    plugins: [dayGridPlugin],
    eventContent: function(arg: any) {
      console.log('Event:', arg.event); 
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
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    const today = new Date();
    const twoMonthsLater = addMonths(today, 2);
    const dateRange = { start: today.toISOString(), end: twoMonthsLater.toISOString() };

    this.calendarService.getTrueAvailabilities(dateRange).subscribe(
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
  
  private updateCalendarEvents(): void {
    this.calendarEvents = this.availability.map(availability => {
      // Assuming availability.date is in ISO format like "2023-09-14"
      // and availability.start_time & availability.end_time are like "07:00:00"
      
      const startDateISO = `${availability.date}T${availability.start_time || '00:00:00'}`;
      const endDateISO = `${availability.date}T${availability.end_time || '23:59:59'}`;
      
      return {
        title: 'Available',
        start: new Date(startDateISO),
        end: new Date(endDateISO),
        backgroundColor: 'gray',
        borderColor: '#12b12f'
      };
    });
    
    console.log('Updated Calendar Events:', this.calendarEvents);
  }
  
  
  private addBookedSlotsToCalendarEvents(bookedSlots: any[]): void {
    const bookedCalendarEvents = bookedSlots.map(slot => ({
      title: 'Booked',
      start: new Date(slot.date + 'T' + slot.start_time),  // Explicitly creating a new Date object
      end: new Date(slot.date + 'T' + slot.end_time),
      backgroundColor: 'gray',
      borderColor: '#ff0000'
    }));
    
    this.calendarEvents = [...this.calendarEvents, ...bookedCalendarEvents];
    console.log('Booked Calendar Events:', bookedCalendarEvents);
  
    // Trigger a change in calendar events which should refresh the calendar.
    this.calendarEvents = [...this.calendarEvents];
  }
  

}