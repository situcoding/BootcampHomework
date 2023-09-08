import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminClientListComponent } from './admin-client-list/admin-client-list.component';
import { AdminMeetingListComponent } from './admin-meeting-list/admin-meeting-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AdminListComponent,
    AdminRegisterComponent,
    AdminClientListComponent,
    AdminMeetingListComponent,
    AdminDashboardComponent,
    AdminLoginComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpClientModule
  ],
  exports: [
    AdminListComponent,
    AdminRegisterComponent
  ]
})
export class AdminModule {}

