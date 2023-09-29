/* client/client.service.ts */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Client } from './client.interface';
import { catchError } from 'rxjs/operators';
import { Meeting } from '../meeting/meeting.model';
import { Permissions } from '../core/permissions';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  AuthService: any;
  getAllMeetings(): Observable<Meeting[]> {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:4000/client'; /* General API URL, adjust as needed */
  
  
  constructor(private http: HttpClient) {}

  /* Method for adding a client (registration) */
  addClient(client: Client): Observable<Client> {
    const registerUrl = `${this.apiUrl}/register`;
    return this.http.post<Client>(registerUrl, client);
  }

  /* Method for confirming a client (if needed) */
  async confirmClient(client: Client): Promise<Client | undefined> {
    const confirmUrl = `${this.apiUrl}/confirm`;
    try {
      const data = { client: client };
      return await this.http.post<Client>(confirmUrl, data).toPromise();
    } catch (error) {
      console.error('Error confirming client:', error);
      return undefined;
    }
  }

  /* Method for client login */
  loginClient(credentials: {client_username: string, password: string}): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<any>(loginUrl, credentials);
  }

  /* Method for getting a client by client_username */
getClientByUsername(clientUsername: string): Observable<Client> {
  const url = `${this.apiUrl}/clients?client_username=${encodeURIComponent(clientUsername)}`;
  return this.http.get<Client>(url);
}


  getUpcomingMeetings(username: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`http://localhost:4000/meeting/upcoming?client_username=${username}`)
      .pipe(
        // Catch any errors that are thrown by the `HttpClient` service.
        catchError(error => {
          console.error('Error getting upcoming meetings:', error);
          return of([]);
        })
      );
  }

  getClientProfile(client_username: string): Observable<any> { 
    return this.http.get<any>(`http://localhost:4000/client/client-profile?client_username=${client_username}`)
      .pipe(
        catchError(error => {
          console.error('Error getting client profile:', error);
          return of([]);
        })
      );
  }

  updateClientProfile(client_username: number, updatedProfile: Client): Observable<Client> {
    const updateProfileUrl = `${this.apiUrl}/${client_username}/profile-update`; 
    return this.http.put<Client>(updateProfileUrl, updatedProfile);
  }

  updateClientPassword(_password: string): Observable<void> { 
   
    const user = this.AuthService.getCurrentUser();
    const record = {}; // Create an empty record object
    if (!this.AuthService.hasPermission(Permissions.OwnClientPasswordWrite, user, record)) {
      return throwError('You do not have permission to perform this action.');
    }

    return of(); 

}
}