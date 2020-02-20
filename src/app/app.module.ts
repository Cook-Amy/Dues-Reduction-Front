import { StaffService } from './staff/staff.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatTableModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule } from  '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StaffComponent } from './staff/staff.component';
import { VenuesComponent } from './venues/venues.component';
import { HeaderComponent } from './header/header.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { VenueLinksComponent } from './venues/venue-links/venue-links.component';
import { EventsComponent } from './events/events.component';
import { VenueContactsComponent } from './venue-contacts/venue-contacts.component';
import { FormsComponent } from './forms/forms.component';
import { DocumentsComponent } from './documents/documents.component';
import { ReportsComponent } from './reports/reports.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventItemComponent } from './events/event-list/event-item/event-item.component';
import { StaffListComponent } from './staff/staff-list/staff-list.component';
import { StaffItemComponent } from './staff/staff-list/staff-item/staff-item.component';
import { EventDetailComponent } from './events/event-list/event-detail/event-detail.component';
import { StaffDetailComponent } from './staff/staff-list/staff-detail/staff-detail.component';
import { StaffEditComponent } from './staff/staff-list/staff-edit/staff-edit.component';
import { VenueStartComponent } from './venues/venue-start/venue-start.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { AuthComponent } from './auth/auth.component';
import { EventTableComponent } from './events/event-list/event-table/event-table.component';
import { StaffTableComponent } from './staff/staff-list/staff-table/staff-table.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StaffComponent,
    VenuesComponent,
    HeaderComponent,
    AdminPageComponent,
    VenueLinksComponent,
    EventsComponent,
    VenueContactsComponent,
    FormsComponent,
    DocumentsComponent,
    ReportsComponent,
    EventListComponent,
    EventItemComponent,
    StaffListComponent,
    StaffItemComponent,
    EventDetailComponent,
    StaffDetailComponent,
    StaffEditComponent,
    DropdownDirective,
    VenueStartComponent,
    EventEditComponent,
    AuthComponent,
    EventTableComponent,
    StaffTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    NoopAnimationsModule,
    MatFormFieldModule, 
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [StaffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
