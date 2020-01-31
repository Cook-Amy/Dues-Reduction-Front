import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PncComponent } from './pnc/pnc.component';
import { StaffComponent } from './staff/staff.component';
import { VenuesComponent } from './venues/venues.component';
import { HeaderComponent } from './header/header.component';
import { WalnutCreekComponent } from './walnut-creek/walnut-creek.component';
import { CarterFinleyComponent } from './carter-finley/carter-finley.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { VenueLinksComponent } from './venue-links/venue-links.component';
import { EventsComponent } from './events/events.component';
import { VenueContactsComponent } from './venue-contacts/venue-contacts.component';
import { FormsComponent } from './forms/forms.component';
import { DocumentsComponent } from './documents/documents.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PncComponent,
    StaffComponent,
    VenuesComponent,
    HeaderComponent,
    WalnutCreekComponent,
    CarterFinleyComponent,
    AdminPageComponent,
    VenueLinksComponent,
    EventsComponent,
    VenueContactsComponent,
    FormsComponent,
    DocumentsComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
