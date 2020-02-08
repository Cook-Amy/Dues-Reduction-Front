import { EventEditComponent } from './events/event-edit/event-edit.component';
import { StaffDetailComponent } from './staff/staff-list/staff-detail/staff-detail.component';
import { EventDetailComponent } from './events/event-list/event-detail/event-detail.component';
import { VenueStartComponent } from './venues/venue-start/venue-start.component';
import { VenueContactsComponent } from './venue-contacts/venue-contacts.component';
import { ReportsComponent } from './reports/reports.component';
import { DocumentsComponent } from './documents/documents.component';
import { FormsComponent } from './forms/forms.component';
import { StaffComponent } from './staff/staff.component';
import { EventsComponent } from './events/events.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { VenuesComponent } from './venues/venues.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },

  { path: 'pnc', component: VenuesComponent, children: [
    { path: '', component: VenueStartComponent },
    { path: 'events', component: EventsComponent, children: [
      { path: 'new', component: EventEditComponent },
      { path: ':id', component: EventDetailComponent },
      { path: ':id/edit', component: EventEditComponent }
    ] },
    { path: 'staff', component: StaffComponent, children: [
      { path: ':id', component: StaffDetailComponent }
    ] }
   ]},

  { path: 'wc', component: VenuesComponent, children: [
    { path: '', component: VenueStartComponent },
    { path: 'events', component: EventsComponent, children: [
      { path: 'new', component: EventEditComponent },
      { path: ':id', component: EventDetailComponent },
      { path: ':id/edit', component: EventEditComponent }
    ] },
    { path: 'staff', component: StaffComponent, children: [
      { path: ':id', component: StaffDetailComponent }
    ] }
   ]},

  { path: 'cf', component: VenuesComponent, children: [
    { path: '', component: VenueStartComponent },
    { path: 'events', component: EventsComponent, children: [
      { path: 'new', component: EventEditComponent },
      { path: ':id', component: EventDetailComponent },
      { path: ':id/edit', component: EventEditComponent }
    ] },
    { path: 'staff', component: StaffComponent, children: [
      { path: ':id', component: StaffDetailComponent }
    ] }
   ]},

  { path: 'admin', component: AdminPageComponent },

  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
