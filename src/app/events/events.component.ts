import { Component, OnInit } from '@angular/core';
import { getRelevantEvents } from '@fullcalendar/core';
import { WebDriver } from 'protractor';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events = allEvents;
  constructor() { }

  ngOnInit() {
  }

}

var allEvents = [
  {"name": "Canes vs Tampa Bay", "day": "Wed", "date": "Sep 18"},
  {"name": "Canes vs Nashville", "day": "Fri", "date": "Sep 27"},
  {"name": "Carrie Underwood Concert", "day": "Mon", "date": "Sep 30"},
  {"name": "Canes vs Montreal", "day": "Thu", "date": "Oct 03"},
  {"name": "BARS Training", "day": "Wed", "date": "Oct 16"}
]
