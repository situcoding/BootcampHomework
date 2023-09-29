/* src/app/app.component.ts */


import { Component, HostListener, OnInit } from '@angular/core';
import { AdminAuthService } from './core/services/admin-auth.service'; 
import { ClientAuthService } from './core/services/client-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  darkMode = false;

  // Inject both AdminAuthService and ClientAuthService
  constructor(
    private adminAuthService: AdminAuthService,
    private clientAuthService: ClientAuthService
  ) {}

  ngOnInit(): void {}

  @HostListener('window:mousemove') refreshUserState() {
    // You can call userActivityDetected() on whichever service you need
    this.adminAuthService.userActivityDetected();
    this.clientAuthService.userActivityDetected();
  }

  @HostListener('window:keydown') refreshUserStateForKeyboard() {
    // You can call userActivityDetected() on whichever service you need
    this.adminAuthService.userActivityDetected();
    this.clientAuthService.userActivityDetected();
  }
}
