import { Component, OnInit, ComponentRef, ViewChild, Renderer2, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { MonthReportService } from 'src/app/createReports/month-report.service';
import { Staff } from 'src/app/models/staff.model';
import { Venue } from 'src/app/models/venue.model';
import { StaffDetailComponent } from 'src/app/staff/staff-list/staff-detail/staff-detail.component';
import { StaffService } from 'src/app/staff/staff.service';
import { VenueService } from 'src/app/venues/venue.service';

@Component({
  selector: 'app-staff-active-list',
  templateUrl: './staff-active-list.component.html',
  styleUrls: ['./staff-active-list.component.css']
})
export class StaffActiveListComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  dtOptions: any = {};
  private childRow: ComponentRef<StaffDetailComponent>;
  //dtTrigger: Subject<any> = new Subject();

  activeForm: FormGroup;

  activeStaff: Staff[] = [];
  activePncStaff: Staff[] = [];
  activeWcStaff: Staff[] = [];
  activeCfStaff: Staff[] = [];

  setStaff: Staff[] = [];

  currentVenue: Venue;
  currentVenueID: number;
  allVenues: Venue[] = [];
  showVenue: number;

  staffNew: Boolean = true;

  monthlyReportMsg: Boolean;
  monthlyReportForm: FormGroup;
  howToSendMsg: boolean = false;

  constructor(private staffService: StaffService,
              private venueService: VenueService,
              private monthReportService: MonthReportService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              private _renderer: Renderer2,
              private compFactory: ComponentFactoryResolver,
              private viewRef: ViewContainerRef) { }

  ngOnInit() {
    this.initForm1();
    this.initForm2();
    this.allVenues = this.venueService.returnAllVenues();
    this.currentVenue = this.venueService.getCurrentVenue();
    this.currentVenueID = this.currentVenue.idvenue;
    this.showVenue = this.currentVenueID;
    this.setAllStaff();
    this.getDtOptions();

    this.staffNew = this.staffService.getStaffNew();
  }

  getDtOptions() {
    if(this.showVenue == 1) {
      this.dtOptions = { 
        processing: true,
        paging: true,
        pagingType: 'full_numbers',
        pageLength: 20,
        lengthChange: true,
        columnDefs: [
          {
            targets: [8],
            type: 'date'
          },
          {
            targets: [3, 4, 5, 6],
            className: 'dt-center'
          }
        ]
      };
    }

    else if(this.showVenue == 2) {
      this.dtOptions = { 
        processing: true,
        paging: true,
        pagingType: 'full_numbers',
        pageLength: 20,
        lengthChange: true,
        columnDefs: [
          {
            targets: [5],
            type: 'date'
          }
        ],
      };
    }

    else if(this.showVenue == 3) {
      this.dtOptions = { 
        processing: true,
        paging: true,
        pagingType: 'full_numbers',
        pageLength: 20,
        lengthChange: true,
        columnDefs: [
          {
            targets: [5],
            type: 'date'
          }
        ]
      };
    }

    else {
      this.dtOptions = {
        processing: true,
        paging: true,
        pagingType: 'full_numbers',
        pageLength: 20,
        lengthChange: true,
        columnDefs: [
          {
            targets: [8, 9, 10],
            type: 'date'
          }
        ]
      };
    }
  }
    
  expandRow(trRef, rowData) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      var row = dtInstance.row(trRef);
      if(row.child.isShown()) {
        row.child.hide();
        this._renderer.removeClass(trRef, 'shown');
      }
      else {
        let factory = this.compFactory.resolveComponentFactory (StaffDetailComponent);
        this.childRow = this.viewRef.createComponent(factory);
        this.childRow.instance.setStaff = [rowData];
        this.childRow.instance.currentVenueID = this.currentVenueID;
        this.childRow.instance.showVenue = this.showVenue;
        row.child(this.childRow.location.nativeElement).show();
        this._renderer.addClass(trRef, 'shown');
      }
    });
  }

  preserveExpandedRows(datatableRef, id, tableData):void {
    try{
      const expandedIds = datatableRef.expandedRows.map(x => x[id]);
      datatableRef.expandedRows = tableData.filter(x => expandedIds.includes(x[id]));
    } catch (error) {
      if(error.name !== 'TypeError') throw error;
    }
  }

  checkForNullString(string) {
    if(string == null)
      return '0';
    else  
      return string;
  }

  checkForNullNum(num) {
    if(num == null)
      return 0;
    else  
      return num;
  }

  getDate(date) {
    var newDate : Date = new Date(date);
    return newDate;
  }

  private initForm1() {
    let venueSelect = false;

    this.activeForm = new FormGroup ({
      'venueSelect': new FormControl(venueSelect, Validators.required)
    });
  }

  private initForm2() {
    let month = "";
    let year = "";
    let emailReport1 = false;
    let emailReport2 = false;
    let downloadReport = false;

    this.monthlyReportForm = new FormGroup ({
      'month': new FormControl(month, Validators.required),
      'year': new FormControl(year, Validators.required),
      'emailReport1': new FormControl(emailReport1, Validators.required),
      'emailReport2': new FormControl(emailReport2, Validators.required),
      'downloadReport': new FormControl(downloadReport, Validators.required)
    });
  }

  setChangedStaff(allStaff) {
    this.staffService.setAllStaffOther(allStaff);
    this.staffService.setAllPncStaff(allStaff);
    this.staffService.setAllWcStaff(allStaff);
    this.staffService.setAllCfStaff(allStaff);

    this.setAllStaff();
  }

  setAllStaff() {
    this.activeStaff = this.staffService.returnActiveStaff();
    this.activePncStaff = this.staffService.returnActivePncStaff();
    this.activeWcStaff = this.staffService.returnActiveWcStaff();
    this.activeCfStaff = this.staffService.returnActiveCfStaff();

      if(this.showVenue == 1) {
        this.setStaff = this.activePncStaff;
      }
      else if(this.showVenue == 2) {
        this.setStaff = this.activeWcStaff;
      }
      else if(this.showVenue == 3) {
        this.setStaff = this.activeCfStaff;
      }
      else if(this.showVenue == 99) {
        this.setStaff = this.activeStaff;
      }
    
  }

  returnSetStaff() {
    return this.setStaff;
  }
 
  changeStaffList() {
    var venueSelect = this.activeForm.value['venueSelect'];
    if(!venueSelect) {
      venueSelect = this.currentVenueID;
    }
    this.showVenue = venueSelect;
    this.getDtOptions();

       // Activity level set to active
      if(venueSelect == 1) {
        this.setStaff = this.activePncStaff;
      }
      else if(venueSelect == 2) {
        this.setStaff = this.activeWcStaff;
      } 
      else if(venueSelect == 3) {
        this.setStaff = this.activeCfStaff;
      }
      else if(venueSelect == 99) {
        this.setStaff = this.activeStaff;
      }

    this.router.navigate([], {relativeTo: this.route});
  }

  onAddStaff() {
    this.monthlyReportMsg = false;
    this.staffNew = true;
  }

  onCreateMonthlyReport() {
    this.staffNew = false;
    this.monthlyReportMsg = true;
  }

  onCancelMonthlyReport() {
    this.monthlyReportMsg = false;
  }

  onSendMonthlyReport() {
    var email1 = this.monthlyReportForm.value['emailReport1'];
    var email2 = this.monthlyReportForm.value['emailReport2'];
    var download = this.monthlyReportForm.value['downloadReport'];
    if(!email1 && !email2 && !download) {
      this.howToSendMsg = true;
    }
    else {
      this.howToSendMsg = false;
      var month = this.monthlyReportForm.value['month'];
      var year = this.monthlyReportForm.value['year'];
  
      var startDate = new Date();
      startDate.setMonth(month - 1);
      startDate.setFullYear(year);
      startDate.setDate(1);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
  
      var endDate = new Date();
      endDate.setMonth(month - 1);
      endDate.setFullYear(year);
      endDate.setDate(31);
      endDate.setHours(0);
      endDate.setMinutes(0);
      endDate.setSeconds(0);
  
      this.monthReportService.getMonthReportData(startDate, endDate, email1, email2, download).subscribe(data => {
        if(email1 || email2) {
            this.toastr.success("Monthly Report was emailed.", "SUCCESS!", {
              closeButton: true,
              timeOut: 3000
            });
        }
        if(download) {
          window.open(window.URL.createObjectURL(data));
        }
        this.onCancelMonthlyReport();
      });
    }
  }

}
