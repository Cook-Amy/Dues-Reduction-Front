import { VenueContactsComponent } from './venue-contacts/venue-contacts.component';
import { ReportsComponent } from './reports/reports.component';
import { DocumentsComponent } from './documents/documents.component';
import { FormsComponent } from './forms/forms.component';
import { StaffComponent } from './staff/staff.component';
import { EventsComponent } from './events/events.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CarterFinleyComponent } from './carter-finley/carter-finley.component';
import { WalnutCreekComponent } from './walnut-creek/walnut-creek.component';
import { VenuesComponent } from './venues/venues.component';
import { PncComponent } from './pnc/pnc.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  // { path: 'venues/:shortName', component: VenuesComponent },
  { path: 'venues/PNC', component: PncComponent },
  { path: 'venues/WC', component: WalnutCreekComponent },
  { path: 'venues/CF', component: CarterFinleyComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'venues', component: VenuesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'venuecontacts', component: VenueContactsComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'reports', component: ReportsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
