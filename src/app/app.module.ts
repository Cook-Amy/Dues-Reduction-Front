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
    AdminPageComponent
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
