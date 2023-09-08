/* core/services/auth.srvice.ts */

import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private timeoutId?: ReturnType<typeof setTimeout>;
  readonly inactivityLimit = 15 * 60 * 1000; // 15 minutes in milliseconds

  constructor(private router: Router, private httpClient: HttpClient) {
    this.resetInactivityTimer();
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
    const currentUser = this.getCurrentUser();
    localStorage.removeItem('token');

    if (currentUser?.role === 'admin') {
      this.router.navigate(['/admin-login']);
    } else {
      this.router.navigate(['/client-login']);
    }
  }

  getCurrentUser(): {
    first_name: string | undefined; 
    username?: string, 
    role?: string 
  } | null {
    const token = localStorage.getItem('token');
    const decoded = this.decode(token);
    return {
      first_name: decoded?.first_name,  
      username: decoded?.client_username || decoded?.admin_username,
      role: decoded?.role || (decoded?.client_username ? 'client' : undefined),
    };
  }



  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private decode(token: string | null): { first_name?: string, role?: string, client_username?: string, admin_username?: string } | null {
    if (token) {
      try {
        const decoded = jwt_decode<{ role?: string, client_username?: string, admin_username?: string }>(token);
        return decoded;
      } catch (err) {
        console.error("Error decoding token: ", err);
      }
    }
    return null;
  }

  

  
  
  getUserRole(admin_username: string, role: string): Observable<string> {
    const userRoleUrl = role === 'admin' ? `/admin-users/${admin_username}/user-role` : `/clients/${admin_username}/user-role`;
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

  hasPermission(requiredPermission: string, user: {username: string, role: string}, record: any): boolean {
    const permissions = {
      'admin_master': ['create', 'read', 'update', 'delete'],
      'admin_user': ['create', 'read', 'update', 'delete_own', 'read_client', 'update_client'],
      'client': ['create_own', 'read_own', 'update_own', 'delete_own']
    };
  
    const userPermissions = permissions[user.role as keyof typeof permissions];
  
    if (!userPermissions) {
      return false;
    }
  
    if (userPermissions.includes(requiredPermission)) {
      return true;
    }
  
    // For 'client' role, check ownership.
    if (user.role === 'client' && userPermissions.includes(requiredPermission + '_own') && record.createdBy === user.username) {
      return true;
    }
  
    // For 'admin_user', they can edit all client profiles and meetings.
    if (user.role === 'admin_user' && (requiredPermission === 'read_client' || requiredPermission === 'update_client')) {
      return true;
    }
  
    return false;
  }
}  