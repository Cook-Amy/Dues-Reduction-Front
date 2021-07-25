import { GlobalVariables } from './shared/GlobalVariables';
import { DropdownDirective } from './shared/dropdown.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatTableModule, MatExpansionModule, MatButtonModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule } from  '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { DateTimePickerModule, TimePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StaffComponent } from './staff/staff.component';
import { VenuesComponent } from './venues/venues.component';
import { HeaderComponent } from './shared/header/header.component';
import { VenueLinksComponent } from './venues/venue-links/venue-links.component';
import { EventsComponent } from './events/events.component';
import { VenueContactsComponent } from './venue-contacts/venue-contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { StaffListComponent } from './staff/staff-list/staff-list.component';
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
import { SettingsComponent } from './user/settings.component';
import { ReportsComponent } from './reports/reports.component';
import { ConfirmDeleteComponent } from './events/event-list/event-detail/modals/confirm-delete/confirm-delete.component';
import { AddShuttleBonusComponent } from './events/event-list/event-detail/modals/add-shuttle-bonus/add-shuttle-bonus.component';
import { AddEventBonusComponent } from './events/event-list/event-detail/modals/add-event-bonus/add-event-bonus.component';
import { AddHourlyBonusComponent } from './events/event-list/event-detail/modals/add-hourly-bonus/add-hourly-bonus.component';
import { SendEventReminderComponent } from './events/event-list/event-detail/modals/send-event-reminder/send-event-reminder.component';
import { SendGateListComponent } from './events/event-list/event-detail/modals/send-gate-list/send-gate-list.component';
import { CreditSummaryComponent } from './staff/staff-list/credit-summary/credit-summary.component';
import { StaffInactiveComponent } from './staff-inactive/staff-inactive.component';
import { StaffInterestedComponent } from './staff-interested/staff-interested.component';
import { StaffAllComponent } from './staff-all/staff-all.component';
import { StaffActiveComponent } from './staff-active/staff-active.component';
import { StaffActiveListComponent } from './staff-active/staff-list/staff-active-list/staff-active-list.component';
import { StaffAllListComponent } from './staff-all/staff-list/staff-all-list/staff-all-list.component';
import { StaffInactiveListComponent } from './staff-inactive/staff-list/staff-inactive-list/staff-inactive-list.component';
import { StaffInterestedListComponent } from './staff-interested/staff-list/staff-interested-list/staff-interested-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StaffComponent,
    VenuesComponent,
    HeaderComponent,
    VenueLinksComponent,
    EventsComponent,
    VenueContactsComponent,
    DocumentsComponent,
    EventListComponent,
    StaffListComponent,
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
    SettingsComponent,
    ReportsComponent,
    ConfirmDeleteComponent,
    AddShuttleBonusComponent,
    AddEventBonusComponent,
    AddHourlyBonusComponent,
    SendEventReminderComponent,
    SendGateListComponent,
    CreditSummaryComponent,
    StaffInactiveComponent,
    StaffInterestedComponent,
    StaffAllComponent,
    StaffActiveComponent,
    StaffActiveListComponent,
    StaffAllListComponent,
    StaffInactiveListComponent,
    StaffInterestedListComponent
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
    DatePickerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatExpansionModule,
    MatButtonModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [GlobalVariables],
  bootstrap: [AppComponent],
  entryComponents: [
    StaffDetailComponent,
    StaffEditComponent,
    EventDetailComponent,
    EventEditComponent,
    ConfirmDeleteComponent,
    EventStaffEditComponent,
    EventStaffAddComponent,
    AddShuttleBonusComponent,
    AddEventBonusComponent,
    AddHourlyBonusComponent,
    SendEventReminderComponent,
    SendGateListComponent,
    CreditSummaryComponent
  ]
})
export class AppModule { }
