import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'meeting-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  availability: any[] = []; // Define the availability array

  constructor() {}

  ngOnInit(): void {
    this.loadAvailabilityData(); // Load availability data from a service or source
  }

  loadAvailabilityData(): void {
    // Fetch availability data and populate the 'availability' array
    // Example: this.availability = ...;
  }
  
}
