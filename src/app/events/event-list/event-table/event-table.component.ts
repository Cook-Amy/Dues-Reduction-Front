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
  
  @Input() dataSource: Event[];

  columnsToDisplay = ['title', 'dateTime'];
  expandedElement: Event;

  constructor() { }

  ngOnInit() {
  }

  getDate(date) {
    var newDate: Date = new Date(date);

    if(newDate.getDate()) {
      var convertDate = (newDate.getMonth() + 1) + '-' + newDate.getDate() + '-' + newDate.getFullYear();
      return convertDate;
  }
    else {
      return date;
    }
  }
}


