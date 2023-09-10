/* app/app-routing.module.ts */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BookMeetingComponent } from './meeting/book-meeting/book-meeting.component';
import { EditMeetingComponent } from './meeting/edit-meeting/edit-meeting.component';
import { ViewMeetingComponent } from './meeting/view-meeting/view-meeting.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ClientLoginComponent } from './client/client-login/client-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
    /* Optionally, you can also add another guard for client routes if needed */
  },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'client-login', component: ClientLoginComponent },
  { path: 'book', component: BookMeetingComponent, canActivate: [AuthGuard],
    data: {expectedRole: 'client'}},
    {
      path: 'meeting/book/book-meeting',
      component: BookMeetingComponent,
      canActivate: [AuthGuard],
      data: { requiredPermission: 'create' }
    },
    {
      path: 'meeting/view/meeting-view',
      component: ViewMeetingComponent,
      canActivate: [AuthGuard],
      data: { requiredPermission: 'read' }
    },
    {
      path: 'meeting/edit/edit-meeting',
      component: EditMeetingComponent,
      canActivate: [AuthGuard],
      data: { requiredPermission: 'update' }
    },
    
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],  /*Debugging purposes only */
  exports: [RouterModule]
})

export class AppRoutingModule {}