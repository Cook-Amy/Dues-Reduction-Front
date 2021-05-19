import { StaffDetailComponent } from './staff-detail/staff-detail.component';
import { ToastrService } from 'ngx-toastr';
import { MonthReportService } from './../../createReports/month-report.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueService } from './../../venues/venue.service';
import { Venue } from './../../models/venue.model';
import { StaffService } from './../staff.service';
import { Staff } from './../../models/staff.model';
import { Component, OnInit, ViewChild, Renderer2, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  dtOptions: any = {};
  private childRow: ComponentRef<StaffDetailComponent>;
  //dtTrigger: Subject<any> = new Subject();

  activeForm: FormGroup;

  allStaff: Staff[] = [];
  activeStaff: Staff[] = [];
  inactiveStaff: Staff[] = [];
  interestedStaff: Staff[] = [];

  allPncStaff: Staff[] = [];
  activePncStaff: Staff[] = [];
  inactivePncStaff: Staff[] = [];
  interestedPncStaff: Staff[] = [];

  allWcStaff: Staff[] = [];
  activeWcStaff: Staff[] = [];
  inactiveWcStaff: Staff[] = [];
  interestedWcStaff: Staff[] = [];

  allCfStaff: Staff[] = [];
  activeCfStaff: Staff[] = [];
  inactiveCfStaff: Staff[] = [];
  interestedCfStaff: Staff[] = [];

  setStaff: Staff[] = [];

  currentVenue: Venue;
  currentVenueID: number;
  allVenues: Venue[] = [];
  showVenue: number;

  staffNew: Boolean = true;
  activityLevel: number = 1;

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
    // this.staffService.staffNewChanged.subscribe(newStaffChanged => {
    //   this.staffNew = newStaffChanged;
    //   this.preserveExpandedRows(this.dtElement, 'idperson', newStaffChanged);
    // });
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
    console.log(JSON.stringify(trRef));
    console.log(JSON.stringify(rowData));
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
    let activeSelect = false;

    this.activeForm = new FormGroup ({
      'venueSelect': new FormControl(venueSelect, Validators.required),
      'activeSelect': new FormControl({value: '1', disabled: false}, Validators.required)
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
    this.allStaff = this.staffService.returnAllStaff();
    this.activeStaff = this.staffService.returnActiveStaff();
    this.inactiveStaff = this.staffService.returnInactiveStaff();
    this.interestedStaff = this.staffService.returnInterestedStaff();

    this.allPncStaff = this.staffService.returnAllPncStaff();
    this.activePncStaff = this.staffService.returnActivePncStaff();
    this.inactivePncStaff = this.staffService.returnInactivePncStaff();
    this.interestedPncStaff = this.staffService.returnInterestedPncStaff();

    this.allWcStaff = this.staffService.returnAllWcStaff();
    this.activeWcStaff = this.staffService.returnActiveWcStaff();
    this.inactiveWcStaff = this.staffService.returnInactiveWcStaff();
    this.interestedWcStaff = this.staffService.returnInterestedWcStaff();

    this.allCfStaff = this.staffService.returnAllCfStaff();
    this.activeCfStaff = this.staffService.returnActiveCfStaff();
    this.inactiveCfStaff = this.staffService.returnInactiveCfStaff();
    this.interestedCfStaff = this.staffService.returnInterestedCfStaff();

    if(this.activityLevel == 1) {
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
    else if(this.activityLevel == 2) {
      if(this.showVenue == 1) {
        this.setStaff = this.inactivePncStaff;
      }
      else if(this.showVenue == 2) {
        this.setStaff = this.inactiveWcStaff;
      }
      else if(this.showVenue == 3) {
        this.setStaff = this.inactiveCfStaff;
      }
      else if(this.showVenue == 99) {
        this.setStaff = this.inactiveStaff;
      }
    }
    else if(this.activityLevel == 3) {
      if(this.showVenue == 1) {
        this.setStaff = this.interestedPncStaff;
      }
      else if(this.showVenue == 2) {
        this.setStaff = this.interestedWcStaff;
      }
      else if(this.showVenue == 3) {
        this.setStaff = this.interestedCfStaff;
      }
      else if(this.showVenue == 99) {
        this.setStaff = this.interestedStaff;
      }
    }
    else if(this.activityLevel == 4) {
      if(this.showVenue == 1) {
        this.setStaff = this.allPncStaff;
      }
      else if(this.showVenue == 2) {
        this.setStaff = this.allWcStaff;
      }
      else if(this.showVenue == 3) {
        this.setStaff = this.allCfStaff;
      }
      else if(this.showVenue == 99) {
        this.setStaff = this.allStaff;
      }
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
    var activeSelect = this.activeForm.value['activeSelect'];

       // Activity level set to active
    if(activeSelect == 1) {
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
    }

    // Activity level set to inactive
    if(activeSelect == 2) {
      if(venueSelect == 1) {
        this.setStaff = this.inactivePncStaff;
      }
      else if(venueSelect == 2) {
        this.setStaff = this.inactiveWcStaff;
      } 
      else if(venueSelect == 3) {
        this.setStaff = this.inactiveCfStaff;
      }
      else if(venueSelect == 99) {
        this.setStaff = this.inactiveStaff;
      }
    }

    // Activity level set to interested
    if(activeSelect == 3) {
      if(venueSelect == 1) {
        this.setStaff = this.interestedPncStaff;
      }
      else if(venueSelect == 2) {
        this.setStaff = this.interestedWcStaff;
      } 
      else if(venueSelect == 3) {
        this.setStaff = this.interestedCfStaff;
      }
      else if(venueSelect == 99) {
        this.setStaff = this.interestedStaff;
      }
    }

    // Activity level set to all
    if(activeSelect == 4) {
      if(venueSelect == 1) {
        this.setStaff = this.allPncStaff;
      }
      else if(venueSelect == 2) {
        this.setStaff = this.allWcStaff;
      } 
      else if(venueSelect == 3) {
        this.setStaff = this.allCfStaff;
      }
      else if(venueSelect = 99) {
        this.setStaff = this.allStaff;
      }
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

