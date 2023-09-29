/* app/meeting/meeting-routing.module.ts */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookMeetingComponent } from '../meeting/book-meeting/book-meeting.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';
import { ViewMeetingComponent } from '../meeting/view-meeting/view-meeting.component';

const clientRoutes: Routes = [
  
  
    
 
    { path: 'book-meeting', component: BookMeetingComponent },
    { path: 'edit-meeting', component: EditMeetingComponent },
    { path: 'view-meeting', component: ViewMeetingComponent}
  /* add more client routes here*/
];

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule]
})
export class MeetingRoutingModule {}

