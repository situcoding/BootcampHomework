
/*  client/client-profile/client-profile.component.ts */

import { Component, OnInit } from '@angular/core';
import { Client } from '../client.interface'; // Import the Client interface
import { ClientService } from '../client.service'; // Import the ClientService
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute to get the client ID

@Component({
  selector: 'client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'], // Add styles if needed
})
export class ClientProfileComponent implements OnInit {
  client: Client | null = null; // Property to hold the client's profile data
  clientProfile: any;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the 'client_username' parameter from the route
    this.route.paramMap.subscribe(params => {
      const clientUsername = params.get('client_username');
      if (clientUsername) {
        // Use the ClientService to fetch the client profile
        this.clientService.getClientProfile(clientUsername).subscribe(
          (profile: any) => {
            this.clientProfile = profile;
            // You can now use this.clientProfile in your template to display the data
          },
          error => {
            console.error('Error fetching client profile:', error);
            // Handle the error as needed (e.g., display an error message)
          }
        );
      } else {
        // Handle the case where 'client_username' parameter is not provided
      }
    });
  }
}