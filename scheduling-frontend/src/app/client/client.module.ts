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
import { ClientMeetingsComponent } from './client-meetings/client-meetings.component';





@NgModule({
  declarations: [
    ClientRegisterComponent,
    ClientDashboardComponent,
    ClientLoginComponent,
    ClientProfileComponent,
    ClientMeetingsComponent
   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientRoutingModule
  ],
  providers: [ClientService]
})
export class ClientModule {}
