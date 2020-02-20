import { EventService } from './../../event.service';
import { VenueService } from './../../../venues/venue.service';
import { Venue } from './../../../models/venue.model';
import { EventCF } from './../../../models/eventCF.model';
import { EventWC } from './../../../models/eventWC.model';
import { EventPNC } from './../../../models/eventPNC.model';
import { Event } from './../../../models/event.model';
import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventTableComponent implements OnInit {
  // @Input() eventList: Event[];
  
  @Input() dataSource: EventPNC[];
  @Input() dataSource2: EventWC[];
  @Input() dataSource3: EventCF[];
  @Input() currentVenueID: number;

  columnsToDisplay = ['Title', 'Date'];
  expandedElement: any;

  expandedElement1: EventPNC;
  expandedElement2: EventWC;
  expandedElement3: EventCF;

  constructor(private venueService: VenueService,
              private eventService: EventService) { }

  ngOnInit() {
    // console.log("current venue ID: " + this.currentVenueID);
    // this.currentVenue = this.venueService.getCurrentVenue();
    // this.currentVenueID = this.currentVenue.idvenue; 

    // if(this.currentVenueID == 1) {
    //   this.dataSource = this.eventService.getEventsPncSortedByDateAscending();
    //   console.log('PNC events length: ' + this.eventService.getEventsPncSortedByDateAscending().length);
    //   console.log('PNC events length: ' + this.eventService.getEventsPnc().length);

    //   console.log('dataSource: ' + this.dataSource.length);
    //   this.expandedElement = this.expandedElementPNC;
    // }
    // else if(this.currentVenueID == 2) {
    //   this.dataSource = this.eventService.getEventsWc();
    //   this.expandedElement = this.expandedElementWC;
    // }
    // else if(this.currentVenueID == 3) {
    //   this.dataSource = this.eventService.getEventsCf();
    //   this.expandedElement = this.expandedElementCF;
    // }

  }

  getDate(date) {
    var newDate: Date = new Date(date);

    if(newDate.getDate()) {
      var convertDate = (newDate.getMonth() + 1) + '-' + newDate.getDate() + '-' + newDate.getFullYear() + ' ' + this.getDay(newDate.getDay());
      return convertDate;
  }
    else {
      return date;
    }
  }

  getDay(day) {
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    return weekday[day];
  }
}


