/* core/services/admin-auth.service.ts */

import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { Permissions } from '../permissions';
import { AdminUser } from '../../admin/admin.interface';


@Injectable({ 
  providedIn: 'root',
})
export class AdminAuthService implements OnDestroy {
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
  
    getCurrentUser(): AdminUser | null {
      const token = localStorage.getItem('token');
      const decoded = this.decode(token);
      if (decoded) {
        return {
         
          first_name: decoded.first_name || 'Unknown', 
          admin_username: decoded.admin_username || 'Unknown', // Default value if undefined
          role: decoded.role || 'admin_user, admin_master'  // Default value if undefined
        
        } as AdminUser;
      }
      return null;
    }

  
    private decode(token: string | null): {
      first_name: string | undefined; role?: string, client_username?: string, admin_username?: string 
} | null {
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
  
    hasPermission(requiredPermission: Permissions, user: AdminUser, record: any): boolean {
      const permissions = {
        'admin_master': [Permissions.AvailabilityRead, Permissions.AvailabilityWrite, Permissions.AllClientMeetingRead, Permissions.AllClientMeetingWrite, Permissions.AllClientProfileRead, Permissions.AllClientProfileWrite, Permissions.AllClientPasswordRead, Permissions.AllClientPasswordWrite,
                        Permissions.AllAdminProfileRead, Permissions.AllAdminProfileWrite, Permissions.AlLAdminPasswordRead, Permissions.AlLAdminPasswordWrite  ],
        'admin_user': [Permissions.AvailabilityRead, Permissions.AvailabilityWrite, Permissions.AllClientMeetingRead, Permissions.AllClientMeetingWrite, Permissions.AllClientProfileRead, Permissions.AllClientProfileWrite, Permissions.AllClientPasswordRead, Permissions.AllClientPasswordWrite]
    
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


function jwt_decode(token: string): { first_name: string | undefined; role?: string | undefined; client_username?: string | undefined; admin_username?: string | undefined; } | null {
    throw new Error('Function not implemented.');
}
  