/* core/services/client-auth.service.ts */

import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable,  of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";
import { Permissions } from "../permissions";
import { Client } from "src/app/client/client.interface";



@Injectable({
  providedIn: 'root',
})
export class ClientAuthService implements OnDestroy {
  private timeoutId?: ReturnType<typeof setTimeout>;
  readonly inactivityLimit = 15 * 60 * 1000; // 15 minutes in milliseconds

  constructor(private router: Router, private httpClient: HttpClient) {
    this.resetInactivityTimer();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  userActivityDetected() {
    this.resetInactivityTimer();
  }

  resetInactivityTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => this.logoutDueToInactivity(), this.inactivityLimit);
  }

  logoutDueToInactivity() {
    console.log("Logging out due to inactivity");
    this.logout();
  }

  logout() {
    console.log('Logout was called');
    const user = this.getCurrentUser();
    const role = user?.role || 'client';
  
    localStorage.removeItem('token');
  
    if (role === 'admin') {
      this.router.navigate(['/admin/admin-login']);
    } else {
      this.router.navigate(['/client/client-login']);
    }
  }

  getCurrentUser(): Client | null {
    const token = localStorage.getItem('token');
    const decoded = this.decode(token);
    if (decoded) {
      return {
        first_name: decoded.first_name || 'unknown',
        client_username: decoded.client_username || 'unknown',
        role: decoded.role || 'unknown'
      } as Client;
    }
    return null;
  }

  private decode(token: string | null): { first_name: string | undefined; role?: string, client_username?: string, admin_username?: string } | null {
    if (!token) return null;
    try {
      return jwt_decode(token);
    } catch (err) {
      console.error("Error decoding token: ", err);
      return null;
    }
  }

  updatePassword(currentPassword: string, newPassword: string, userType: 'client' | 'admin'): Observable<void> {
    const user = this.getCurrentUser();
    if (!user) {
      return throwError('User not found.');
    }
  
    const payload = { currentPassword, newPassword };
    const updatePasswordUrl = `/${userType}/update-password`;
  
    return this.httpClient.post(updatePasswordUrl, payload).pipe(
      map(() => {}),
      catchError((error) => {
        console.error('Failed to update password:', error);
        return throwError('Failed to update password.');
      })
    );
  }



  getUserRole(username: string, role: string): Observable<string> {
    const userRoleUrl = role === 'admin' ? `/admin-users/${username}/user-role` : `/clients/${username}/user-role`;
    return this.httpClient.get(userRoleUrl).pipe(
      map((response: any) => response?.role || 'client'),
      catchError(() => of('client'))
    );
  }

  authenticateUser(username: string, password: string, userType: string): Observable<boolean> {
    const loginPayload = {
      [`${userType}_username`]: username,
      password
    };
    const loginUrl = `/${userType}/${userType}-login`;
    return this.httpClient.post(loginUrl, loginPayload).pipe(
      map((response: any) => !!response?.token),
      catchError(() => of(false))
    );
  }

  hasPermission(requiredPermission: Permissions, user: Client, _record: any): boolean {
    const permissions = {
    
      'client': [Permissions.AvailabilityRead, Permissions.OwnClientMeetingRead, Permissions.OwnClientMeetingWrite, Permissions.OwnClientProfileRead, Permissions.OwnClientProfileWrite, Permissions.OwnClientPasswordRead, Permissions.OwnClientPasswordWrite]
    };

    const userPermissions = permissions[user.role as keyof typeof permissions];

    if (!userPermissions) {
      return false;
    }

    return userPermissions.includes(requiredPermission);
  }




    }

function throwError(_arg0: string): Observable<void> {
  throw new Error("Function not implemented.");
}
  