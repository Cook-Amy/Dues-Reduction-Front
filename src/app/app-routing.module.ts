import { EventDetailComponent } from './events/event-list/event-detail/event-detail.component';
import { SettingsComponent } from './user/settings.component';
import { DocumentsComponent } from './documents/documents.component';
import { VenueStartComponent } from './venues/venue-start/venue-start.component';
import { StaffComponent } from './staff/staff.component';
import { EventsComponent } from './events/events.component';
import { VenuesComponent } from './venues/venues.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ReportsComponent } from './reports/reports.component';



const routes: Routes = [
  { path: 'pnc', component: VenuesComponent, children: [
    { path: 'events', component: EventsComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'documents', component: DocumentsComponent },
    { path: '', component: VenueStartComponent }
   ]},

  { path: 'wc', component: VenuesComponent, children: [
    { path: 'events', component: EventsComponent},
    { path: 'staff', component: StaffComponent },
    { path: 'documents', component: DocumentsComponent },
    { path: '', component: VenueStartComponent }
   ]},

  { path: 'cf', component: VenuesComponent, children: [
    { path: 'events', component: EventsComponent},
    { path: 'staff', component: StaffComponent },
    { path: 'documents', component: DocumentsComponent },
    { path: '', component: VenueStartComponent },
   ]},

  { path: 'admin', component: VenuesComponent, children: [
    { path: 'events', component: EventsComponent},
    { path: 'staff', component: StaffComponent },
    { path: 'documents', component: DocumentsComponent },
    { path: 'reports', component: ReportsComponent },
    { path: '', component: VenueStartComponent },
   ]},

  { path: 'login', component: AuthComponent },

  { path: 'settings', component: SettingsComponent },

  { path: 'home', component: HomeComponent },

  { path: '', component: AuthComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
