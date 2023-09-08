/* core/guards/auth.guard.ts */ 

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import jwt_decode from 'jwt-decode';



interface LoginResponse {
    token: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private httpClient: HttpClient, private router: Router) {}

  private decode(token: string | null): { role?: string, client_username?: string } | null {
    if (token) {
      try {
        const decoded = jwt_decode<{ role?: string, client_username?: string }>(token);
        return decoded;
      } catch (err) {
        console.error("Error decoding token: ", err);
      }
    }
    return null;
  }
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data["expectedRole"];
    console.log('Expected Role:', expectedRole); 
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    const tokenPayload = this.decode(token);
    console.log('Token Payload:', tokenPayload); 
    let currentRole = tokenPayload?.role;
    console.log('Current Role:', currentRole);
    // Default to 'client' role if client_username exists
    if (tokenPayload?.client_username) {
      currentRole = 'client';
    }
  
    if (!token || !currentRole || !(currentRole === expectedRole)) {
      this.router.navigate(['login']);
      return of(false);
    }
    return of(true);
  }
  
  
  
  

  authenticateUser(username: string, password: string, userType: string): Observable<boolean> {
    let loginPayload: any;
    
    if (userType === 'admin') {
      loginPayload = {
        admin_username: username,
        password: password
      };
    } else if (userType === 'client') {
      loginPayload = {
        client_username: username,
        password: password
      };
    } else {
      return of(false);
    }
  
    console.log('Sending login payload:', loginPayload);  /* console log the possible error */
  
    let loginUrl: string;
    if (userType === 'admin') {
      loginUrl = '/admin/login';
    } else if (userType === 'client') {
      loginUrl = '/client/login';
    } else {
      return of(false);
    }
  
    return this.httpClient.post<LoginResponse>(loginUrl, loginPayload).pipe(
      map((response: LoginResponse) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
    
  }
}

