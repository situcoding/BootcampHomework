/* app/admin/admin-routing.module.ts */


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminClientListComponent } from './admin-client-list/admin-client-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminMeetingListComponent } from './admin-meeting-list/admin-meeting-list.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path: 'admin-dashboard', component: AdminDashboardComponent }, 
  { path: 'admin-register', component: AdminRegisterComponent }, 
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-client-list', component: AdminClientListComponent, canActivate: [AuthGuard] },
  { path: 'admin-list', component: AdminListComponent, canActivate: [AuthGuard] },
  { path: 'admin-meeting-list', component: AdminMeetingListComponent, canActivate: [AuthGuard] },
  /* add more admin routes here */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
