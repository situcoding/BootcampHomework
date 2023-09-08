/* calendar/calendar.service.ts */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Availability } from './availability.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = 'http://localhost:4000/availability';

  constructor(private http: HttpClient) {}

  getUnexpiredAvailabilities(): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.apiUrl}/getUnexpiredAvailability`);
  }
  

  getBookedSlots(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookedSlots`);
  }
  
  /* Add other methods for handling bookings, cancellations, etc. */
}
