import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service'; // corrected the import here

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
  constructor(private authService: AuthService) {} // AuthService should now be correctly imported

  ngOnInit(): void {}

  @HostListener('window:mousemove') refreshUserState() {
    this.authService.userActivityDetected();
  }

  @HostListener('window:keydown') refreshUserStateForKeyboard() {
    this.authService.userActivityDetected();
  }
}
