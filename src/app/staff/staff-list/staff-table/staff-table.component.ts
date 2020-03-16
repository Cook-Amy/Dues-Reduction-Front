import { Staff } from './../../../models/staff.model';
import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-staff-table',
  templateUrl: './staff-table.component.html',
  styleUrls: ['./staff-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StaffTableComponent implements OnInit {

    @Input() dataSource: Staff[];
    @Input() currentVenueID: number;
    @Input() showVenue: number;

    columnsToDisplay = ['Name', 'Email', 'Phone'];
    expandedElement: any;
    
  constructor() { }

  ngOnInit() {
  }

}
