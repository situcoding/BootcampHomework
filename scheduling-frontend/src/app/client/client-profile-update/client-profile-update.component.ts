/* client/client-profile-update/client-profile-update.component.ts */


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Client } from '../client.interface';
import { ClientAuthService } from '../../core/services/client-auth.service'; // Assuming AuthService is located here
import { Permissions } from 'src/app/core/permissions';

@Component({
  selector: 'client-profile-update',
  templateUrl: './client-profile-update.component.html',
  styleUrls: ['./client-profile-update.component.scss'],
})
export class ClientProfileUpdateComponent implements OnInit {
  profileUpdateForm: FormGroup;
  client: Client | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private authService: ClientAuthService

  ) {
    this.profileUpdateForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      birthday: [null],
      gender: ['', Validators.required],
      street: ['', Validators.required],
      unitApptnumber: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      role: [''], // You may or may not allow users to update the role
      companySchool: [''], // You may or may not allow users to update this field
      client_username: [''], // Assuming you won't allow users to update their username
    });
  }

  ngOnInit(): void {
    const clientUsername = this.route.snapshot.params['client_username'];
    this.clientService.getClientByUsername(clientUsername).subscribe(
      (client) => {
        this.client = client;
        this.profileUpdateForm.patchValue(client);
      },
      (error) => {
        console.error('Error fetching client by username:', error);
      }
    );
    
  }

  
  
  onSubmit(): void {
    if (this.profileUpdateForm.valid && this.client) { // Added check for this.client
      const updatedProfileData = this.profileUpdateForm.value;
      const clientUsername = this.route.snapshot.params['client_username'];

      // Using this.client directly
      if (this.authService.hasPermission(Permissions.OwnClientProfileWrite, this.client, null)) {
        this.clientService.updateClientProfile(clientUsername, updatedProfileData).subscribe(
          (response) => {
            console.log('Profile updated successfully', response);
            this.router.navigate(['/client/profile']);
          },
          (error) => {
            console.error('Error updating profile', error);
          }
        );
      } else {
        console.error('Permission denied to update profile.');
      }
    } else {
      console.error('Form is invalid or client is null.');
    }
  }
}