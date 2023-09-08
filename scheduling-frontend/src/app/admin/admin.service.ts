import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminBaseUrl = 'http://localhost:4000/admin';


  constructor(private http: HttpClient) {}

  // Admin User Methods
  getAllAdminUsers(): Observable<any> {
    return this.http.get(`${this.adminBaseUrl}`);
  }

  createAdminUser(data: any): Observable<any> {
    return this.http.post(`${this.adminBaseUrl}/create`, data);
    }
}