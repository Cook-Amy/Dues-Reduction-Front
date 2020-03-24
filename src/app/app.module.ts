import { GlobalVariables } from './shared/GlobalVariables';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { DateTimePickerModule, TimePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';



import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StaffComponent } from './staff/staff.component';
import { VenuesComponent } from './venues/venues.component';
import { HeaderComponent } from './shared/header/header.component';
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
import { EventEditComponent } from './events/event-list/event-edit/event-edit.component';
import { AuthComponent } from './auth/auth.component';
import { EventTableComponent } from './events/event-list/event-table/event-table.component';
import { StaffTableComponent } from './staff/staff-list/staff-table/staff-table.component';
import { EventNewComponent } from './events/event-list/event-new/event-new.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EventStaffEditComponent } from './events/event-list/event-staff-edit/event-staff-edit.component';
import { EventStaffAddComponent } from './events/event-list/event-staff-add/event-staff-add.component';
import { StaffNewComponent } from './staff/staff-list/staff-new/staff-new.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FileUploaderComponent } from './shared/files/file-uploader/file-uploader.component';
import { FileListComponent } from './shared/files/file-list/file-list.component';



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
    StaffTableComponent,
    EventNewComponent,
    FooterComponent,
    EventStaffEditComponent,
    EventStaffAddComponent,
    StaffNewComponent,
    CalendarComponent,
    FileUploaderComponent,
    FileListComponent
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
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    DateTimePickerModule,
    TimePickerModule, 
    DatePickerModule
  ],
  providers: [GlobalVariables],
  bootstrap: [AppComponent]
})
export class AppModule { }
