/* client/client-password-update/client-password-update.component.ts */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientAuthService } from 'src/app/core/services/client-auth.service';

@Component({
  selector: 'client-password-update',
  templateUrl: './client-password-update.component.html',
  styleUrls: ['./client-password-update.component.scss'],
})
export class ClientPasswordUpdateComponent implements OnInit {
  ClientpasswordUpdateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: ClientAuthService
  ) {
    this.ClientpasswordUpdateForm = this.formBuilder.group({
      currentClientPassword: ['', Validators.required],
      newClientPassword: ['', Validators.required],
      confirmClientPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.ClientpasswordUpdateForm.valid) {
      const currentPassword = this.ClientpasswordUpdateForm.get('currentClientPassword')?.value;
      const newPassword = this.ClientpasswordUpdateForm.get('newClientPassword')?.value;

      // Assuming userType is 'client' for this component. Adjust as necessary.
      const userType = 'client';

      if (currentPassword && newPassword) {
        this.authService.updatePassword(currentPassword, newPassword, userType).subscribe(
          () => {
            this.router.navigate(['/client-password-updated']);
          },
          (error: any) => {
            console.error('Password update failed', error);
            // Optionally, display an error message to the user
          }
        );
      }
    }
  }
}
