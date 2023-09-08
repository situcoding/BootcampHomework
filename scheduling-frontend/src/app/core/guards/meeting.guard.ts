/* core/guards/meeting.guard.ts */


// core/guards/meeting.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    console.log('Current User:', user);
    if (user?.username && user?.role && this.authService.hasPermission('create', { username: user.username, role: user.role }, null)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
