import { CalendarEvent } from './../models/calendar.model';
import { HttpClient } from '@angular/common/http';
import { Event } from './../models/event.model';
import { GlobalVariables } from './../shared/GlobalVariables';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  serverUrl = GlobalVariables.serverUrl;

  calendarEventsAll: CalendarEvent[] = [];
  calendarEventsPnc: CalendarEvent[] = [];
  calendarEventsWc: CalendarEvent[] = [];
  calendarEventsCf: CalendarEvent[] = [];

  constructor(private http: HttpClient) { }

  getAllEvents() {
    const eventsReturned = this.http.get<CalendarEvent[]>(this.serverUrl + 'getCalendarEvents');
    return eventsReturned;
  }

  setEvents(events: CalendarEvent[]) {
    this.calendarEventsAll = [];
    this.calendarEventsPnc = [];
    this.calendarEventsWc = [];
    this.calendarEventsCf = [];
    events.forEach(ev => {
      ev.color = "#0579AE";
      this.calendarEventsAll.push(ev);
      if(ev.venueID == 1 && ev.date) {
        ev.color = "#FF9966";
        this.calendarEventsPnc.push(ev);
      }
      if(ev.venueID == 2 && ev.date) {
        ev.color = "#BF80FF";
        this.calendarEventsWc.push(ev);
      }
      if(ev.venueID == 3 && ev.date) {
        ev.color = "#66CC99";
        this.calendarEventsCf.push(ev);}
    });
  }

  returnEventsAll() { return this.calendarEventsAll.slice(); }
  returnEventsPnc() { return this.calendarEventsPnc.slice(); }
  returnEventsWc() { return this.calendarEventsWc.slice(); }
  returnEventsCf() { return this.calendarEventsCf.slice(); }

  returnDate(date) {
    var d = new Date(date);
    var convert = "";
    if(date) {
      convert = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    }
    return convert;
  }
 
}
