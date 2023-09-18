/* admin/admin.service.ts */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminUser } from './admin.interface';
import { Meeting } from '../meeting/meeting.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminBaseUrl = 'http://localhost:4000/admin';
  private apiUrl = 'http://localhost:4000/admin'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Admin User Methods
  getAllAdminUsers(): Observable<any> {
    return this.http.get(`${this.adminBaseUrl}`);
  }

  addAdminUser(admin: AdminUser): Observable<AdminUser> {
    const registerUrl = `${this.apiUrl}/register`;
    return this.http.post<AdminUser>(registerUrl, admin);
  }

  async confirmAdmin(admin: AdminUser): Promise<AdminUser | undefined> {
    const confirmUrl = `${this.apiUrl}/confirm`;
    try {
      const data = { admin: admin };
      return await this.http.post<AdminUser>(confirmUrl, data).toPromise();
    } catch (error) {
      console.error('Error confirming admin:', error);
      return undefined;
    }
  }

  loginAdmin(credentials: { admin_username: string; password: string }): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<any>(loginUrl, credentials);
  }
  getAdminUserById(id: number): Observable<AdminUser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<AdminUser>(url);
  }
  

  getUpcomingMeetings(username: string): Observable<Meeting[]> {
    const upcomingMeetingsUrl = `${this.adminBaseUrl}/meeting/upcoming`;
    return this.http.get<Meeting[]>(upcomingMeetingsUrl).pipe(
      catchError(error => {
        console.error('Error getting upcoming meetings:', error);
        return of([]);
      })
    );
  }
}
