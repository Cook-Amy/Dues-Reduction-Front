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
    @Input() dataSource2: Staff[];
    @Input() dataSource3: Staff[];
    @Input() currentVenueID: number;

    columnsToDisplay = ['Name', 'Email', 'Phone'];
    expandedElement: any;
    expandedElement1: any;
    expandedElement2: any;
    expandedElement3: any;
    
  constructor() { }

  ngOnInit() {
  }

}
