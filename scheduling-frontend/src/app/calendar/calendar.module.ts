/* calendar/calendar.module.ts */


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // Importing here
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';


@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    CalendarService
  ],
  exports: [
    CalendarComponent /* Optionally, export your CalendarComponent if you intend to use it outside this module */
  ],
   bootstrap: [AppComponent]
})
export class CalendarModule { }
