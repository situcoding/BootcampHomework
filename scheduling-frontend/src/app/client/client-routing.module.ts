/* app/client/client-routing.module.ts */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { ViewMeetingComponent } from '../meeting/view-meeting/view-meeting.component';

const clientRoutes: Routes = [
  
  
    { path: '', redirectTo: 'client-dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
    { path: 'client-dashboard', component: ClientDashboardComponent },
    { path: 'client-login', component: ClientLoginComponent },
    { path: 'client-register', component: ClientRegisterComponent },
    { path: 'client-profile', component: ClientProfileComponent },
    { path: 'view-meeting/:id', component: ViewMeetingComponent}
  /* add more client routes here*/
];

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}

