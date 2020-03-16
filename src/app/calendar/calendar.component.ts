import { CalendarService } from './calendar.service';
import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from './../models/calendar.model';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() currentVenueID: number; 

  calendarPlugins = [dayGridPlugin];
  calendarEventsAll: CalendarEvent[];
  calendarEventsPnc: CalendarEvent[];
  calendarEventsWc: CalendarEvent[];
  calendarEventsCf: CalendarEvent[];

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {

    this.calendarService.getAllEvents().subscribe(events => {
      this.calendarService.setEvents(events);
      this.calendarEventsAll = this.calendarService.returnEventsAll();
      this.calendarEventsPnc = this.calendarService.returnEventsPnc();
      this.calendarEventsWc = this.calendarService.returnEventsWc();
      this.calendarEventsCf = this.calendarService.returnEventsCf();
    });
  }

}
