/* meeting/meeting.service.ts */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meeting } from './meeting.model';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {

  private apiUrl = 'http://localhost:4000/meeting'; // Replace with your actual API URL
  jwtToken: any;

  constructor(private http: HttpClient) {}

  bookMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.apiUrl}/book`, meeting);
  }

  editMeeting(id: string, meeting: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.apiUrl}/edit/${id}`, meeting);
  }

  getMeeting(id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.apiUrl}/view/${id}`);
  }

  fetchMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/list`).pipe(
      map(meetings => meetings.map(meeting => {
        const combinedDateTime = new Date(`${meeting.date}T${meeting.start_time}Z`);
        return {
          ...meeting,
          combinedDateTime
        };
      }))
    );
  }

  getUpcomingMeetings(username: string, role: string): Observable<Meeting[]> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
  
    let apiEndpoint = role === 'admin' ? `/api/meetings/upcoming/all` : `/api/meetings/upcoming/${username}`;
    
    return this.http.get<Meeting[]>(apiEndpoint, {headers: headers});
  }
  
  
  }

