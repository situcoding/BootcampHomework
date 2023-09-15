/* calendar/calendar.service.ts */


// calendar/calendar.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Availability } from './availability.model';
import { BookedSlot } from './booked-slot.model';  // import the new model

interface DateRange {
  start: string;
  end: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = 'http://localhost:4000/calendar';

  constructor(private http: HttpClient) {}

  getTrueAvailabilities(dateRange: DateRange): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.apiUrl}/getTrueAvailabilities`, {
      params: {
        start: dateRange.start,
        end: dateRange.end
      }
    });
  }

  getBookedSlots(dateRange: DateRange): Observable<BookedSlot[]> { // Update the type here
    return this.http.get<BookedSlot[]>(`${this.apiUrl}/getBookedSlots`, { // Update the type here
      params: {
        start: dateRange.start,
        end: dateRange.end
      }
    });
  }
  // Other methods
}
