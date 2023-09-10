/* core/services/auth.srvice.ts */


import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";

interface User {
  first_name: string | undefined;
  username: string | undefined; 
  role: string | undefined   // Now role is taken directly from the decoded JWT or database
}

interface Record {
  createdBy?: string;
}

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
    const user = this.getCurrentUser();
    const role = user?.role || 'client'; // Default to 'client' if role is not defined
  
    // Remove token and other session artifacts
    localStorage.removeItem('token');
  
    // Redirect based on role
    if (role === 'admin') {
      this.router.navigate(['/admin/admin-login']);
    } else {
      this.router.navigate(['/client/client-login']);
    }
  }
  

  logout() {
    console.log('Logout was called');
    const user = this.getCurrentUser();
    const role = user?.role || 'client'; // Default to 'client' if role is not defined
  
    // Remove token and other session artifacts
    localStorage.removeItem('token');
  
    // Redirect based on role
    if (role === 'admin') {
      this.router.navigate(['/admin/admin-login']);
    } else {
      this.router.navigate(['/client/client-login']);
    }
  }
  
  

  getCurrentUser(): User | null {
    const token = localStorage.getItem('token');
    const decoded = this.decode(token);
    if (decoded) {
      return {
        first_name: decoded.first_name,
        username: decoded.client_username || decoded.admin_username,
        role: decoded.role  // directly taken from the JWT or database
      };
    }
    return null;
  }

  private decode(token: string | null): {
    first_name: string | undefined; role?: string, client_username?: string, admin_username?: string 
} | null {
    if (token) {
      try {
        return jwt_decode(token);
      } catch (err) {
        console.error("Error decoding token: ", err);
      }
    }
    return null;
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

  hasPermission(requiredPermission: string, user: User, record: Record): boolean {
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
  
    if (user.role === 'client' && userPermissions.includes(requiredPermission + '_own') && record.createdBy === user.username) {
      return true;
    }
  
    if (user.role === 'admin_user' && (requiredPermission === 'read_client' || requiredPermission === 'update_client')) {
      return true;
    }
  
    return false;
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
