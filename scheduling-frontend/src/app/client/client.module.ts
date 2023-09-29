/* client/client.module.ts */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { ClientService } from './client.service';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientProfileUpdateComponent } from './client-profile-update/client-profile-update.component';
import { ClientPasswordUpdateComponent } from './client-password-update/client-password-update.component';





@NgModule({
  declarations: [
    ClientRegisterComponent,
    ClientDashboardComponent,
    ClientLoginComponent,
    ClientProfileComponent,
    ClientProfileUpdateComponent,
    ClientPasswordUpdateComponent
   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientRoutingModule
  ],
  providers: [ClientService]
})
export class ClientModule {}
