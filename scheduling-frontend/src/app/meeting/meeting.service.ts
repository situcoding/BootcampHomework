/* meeting/meeting.service.ts */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Meeting } from './meeting.model';
import { hasPermission, Permissions, UserRoles } from '../core/permissions';
import { ClientAuthService } from '../core/services/client-auth.service';
import { AdminAuthService } from '../core/services/admin-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private apiUrl = 'http://localhost:4000/meeting';

  constructor(
    private http: HttpClient, 
    private clientAuthService: ClientAuthService, 
    private adminAuthService: AdminAuthService,
    private snackBar: MatSnackBar 
  ) {}

  getCurrentAuthService(role: string) {
    return (role === 'admin_user' || role === 'admin_master') ? 
            this.adminAuthService : 
            this.clientAuthService;
  }

  bookMeeting(meeting: Meeting): Observable<Meeting> {
    const user = this.clientAuthService.getCurrentUser() || this.adminAuthService.getCurrentUser();
    if (!user) return throwError('User not found.');

    const userRole = user?.role as UserRoles;
    let record: any = { };
    if ('client_username' in user) record.client_username = user.client_username;
    if (!hasPermission(Permissions.OwnClientMeetingWrite, userRole, user, record)) 
        return throwError('You do not have permission to book a meeting.');
  
    return this.http.post<Meeting>(`${this.apiUrl}/book-meeting`, meeting).pipe(
      map(response => {
        if (response && response.success) {
          this.snackBar.open('Meeting booked successfully!', 'Close', { duration: 10000 });
        } else {
          this.snackBar.open('Failed to book the meeting. Try again.', 'Close', { duration: 10000 });
        }
        return response;
      }),
      catchError(error => {
        console.error('Error booking meeting:', error);
        this.snackBar.open('An error occurred. Try again.', 'Close', { duration: 3000 });
        return throwError(error);
      })
    );
  }



  
  editMeeting(id: string, meeting: Meeting): Observable<Meeting> {
    const user = this.clientAuthService.getCurrentUser() || this.adminAuthService.getCurrentUser();
    const userRole = user?.role as UserRoles;
    if (!user) {
      return throwError('User not found.');
    }
  
    if (!hasPermission(Permissions.OwnClientMeetingWrite, userRole, user, meeting)){
      return throwError('You do not have permission to edit this meeting.');
    }
  
    return this.http.put<Meeting>(`${this.apiUrl}/edit-meeting/${id}`, meeting);
}


  getMeeting(id: string): Observable<Meeting> {
    const user = this.clientAuthService.getCurrentUser() || this.adminAuthService.getCurrentUser();
    return this.http.get<Meeting>(`${this.apiUrl}/view-meeting/${id}`).pipe(
      map((meeting: Meeting) => {
        if (user) {
          const userRole = user?.role as UserRoles;
          if (!hasPermission(Permissions.OwnClientMeetingRead, userRole, user, meeting)) {
            throw new Error("Permission denied.");
          }
        }
        // Rest of your code...
        return meeting;
      }),
      catchError((error) => {
        console.error("Error fetching meeting:", error);
        return throwError(error);
      })
    );
}
getUpcomingMeetings(username: string, role: string): Observable<Meeting[]> {
  const user = this.clientAuthService.getCurrentUser() || this.adminAuthService.getCurrentUser();
  const userRole = user?.role as UserRoles;

  // Choose API endpoint based on the role
  let apiEndpoint: string;

  if (userRole === 'admin_user' || role === 'admin_master') {
    apiEndpoint = `${this.apiUrl}/upcoming/all`;
  } else if (role === 'client') {
    apiEndpoint = `${this.apiUrl}/upcoming?client_username=${username}`;
  } else {
    console.error('Invalid role:', role);
    return throwError('Invalid role'); // Return an error observable here
  }

  // Make an HTTP request to the selected endpoint and return the observable
  return this.http.get<Meeting[]>(apiEndpoint);
}

}