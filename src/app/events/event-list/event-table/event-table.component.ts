import { Event } from './../../../models/event.model';
import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css'],
})
export class EventTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;  
  @Input() dataSource: Event[];
  @Input() currentVenueID: number;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  columnsToDisplay = ['Title', 'Date'];
  expandedElement: Event;
  count = 0

  constructor() { }

  ngOnInit() { 
    this.dtOptions = {
      data: this.dataSource,
      columns: [{
        title: 'Name',
        data: 'Name'
      }, {
        title: 'Email',
        data: 'Email'
      }, {
        title: 'Phone',
        data: 'Phone'
      }], 
      paging: true,
      pagingType: 'full_numbers',
      pageLength: 20,
      lengthChange: true
    };
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    this.rerender();

  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
      console.log(JSON.stringify(this.dataSource));
    });
  }

  getDate(date) {
    if(date == null) {
      return "---";
    }
    else {
      this.count++;
      if(this.count % 2 == 0) {
        var newDate: Date = new Date(date);
  
        if(newDate.getDate()) {
          var convertDate = (newDate.getMonth() + 1) + '-' + newDate.getDate() + '-' + newDate.getFullYear();
          return convertDate;
        } 
        else {
          return date;
        }
      }
      else {
        return date;
      }

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


