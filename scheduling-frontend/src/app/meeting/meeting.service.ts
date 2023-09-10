/* meeting/meeting.service.ts */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    return this.http.get<Meeting>(`${this.apiUrl}/view/${id}`).pipe(
      map((meeting: Meeting) => {
        if (!meeting.date || !meeting.start_time || !meeting.end_time || !meeting.time_zone || !meeting.location || !meeting.meeting_type || !meeting.createdAt) {
          throw new Error("Invalid meeting object received from API");
        }
        return meeting;
      }),
      catchError((error) => {
        console.error("Error fetching meeting:", error);
        return throwError(error);
      })
    );
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

    // Choose API endpoint based on the role
    let apiEndpoint: string;
    if (role === 'admin' || role === 'admin_master') {
      apiEndpoint = `${this.apiUrl}/upcoming/all`;
    } else if (role === 'client') {
      apiEndpoint = `${this.apiUrl}/upcoming?client_username=${username}`;
    } else {
      console.error('Invalid role:', role);
      return of([]);
    }
  
    return this.http.get<Meeting[]>(apiEndpoint, { headers: headers }).pipe(
      catchError(error => {
        console.error('Error getting upcoming meetings:', error);
        return of([]);
      })
    );
  }
}
