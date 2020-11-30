import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Staff } from './../../../models/staff.model';
import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-staff-table',
  templateUrl: './staff-table.component.html',
  styleUrls: ['./staff-table.component.css'],
})
export class StaffTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;

  @Input() staff: Staff[];
  @Input() currentVenueID: number;
  @Input() showVenue: number;

 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  // dtOptions: any = {};
    
    
  constructor() { }

  ngOnInit() {
    // this.table.nativeElement.innerHtml = '<table datatable [dtOptions]="dtOptions" class="row-border hover"></table>';

    this.dtOptions = {
      data: this.staff,
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
      console.log(JSON.stringify(this.staff));
    });
  }
  
}
