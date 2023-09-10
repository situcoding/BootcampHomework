/* app.module.ts */


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { CalendarModule } from './calendar/calendar.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookMeetingComponent } from './meeting/book-meeting/book-meeting.component';
import { ViewMeetingComponent } from './meeting/view-meeting/view-meeting.component';
import { EditMeetingComponent } from './meeting/edit-meeting/edit-meeting.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookMeetingComponent,
    ViewMeetingComponent,
    EditMeetingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FullCalendarModule,
    SharedModule,
    AppRoutingModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
