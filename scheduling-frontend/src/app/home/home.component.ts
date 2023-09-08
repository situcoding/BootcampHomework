import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  darkMode = false;  /* initially set to false*/

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    console.log('toggleDarkMode called. Dark mode is:', this.darkMode);
  }
 
  }

