import { MonthReportService } from './../../createReports/month-report.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueService } from './../../venues/venue.service';
import { Venue } from './../../models/venue.model';
import { StaffService } from './../staff.service';
import { Staff } from './../../models/staff.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
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
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.allVenues = this.venueService.returnAllVenues();
    this.currentVenue = this.venueService.getCurrentVenue();
    this.currentVenueID = this.currentVenue.idvenue;
    this.showVenue = this.currentVenueID;
    this.getAllStaff();

    this.staffService.allStaffChanged.subscribe(staffChanged => {
      this.setAllStaff(staffChanged);
      this.router.navigate([], {relativeTo: this.route});
    });

    this.staffNew = this.staffService.getStaffNew();
    this.staffService.staffNewChanged.subscribe(newStaffChanged => {
      this.staffNew = newStaffChanged;
    });
  }

  private initForm() {
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

  getAllStaff() {
    this.staffService.getAllStaff().subscribe(allStaff => {
      this.staffService.setAllStaff(allStaff);
    });
  }

  setAllStaff(allStaff) {
    this.staffService.setAllStaffOther(allStaff);
    this.staffService.setAllPncStaff(allStaff);
    this.staffService.setAllWcStaff(allStaff);
    this.staffService.setAllCfStaff(allStaff);

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

 

  changeActive(value) {
    // console.log("value: " + value.activeSelect);

    // Activity level set to active
    if(value.activeSelect == 1) {
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

    // Activity level set to inactive
    if(value.activeSelect == 2) {
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

    // Activity level set to interested
    if(value.activeSelect == 3) {
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


    // Activity level set to all
    if(value.activeSelect == 4) {
      if(this.showVenue == 1) {
        this.setStaff = this.allPncStaff;
      }
      else if(this.showVenue == 2) {
        this.setStaff = this.allWcStaff;
      } 
      else if(this.showVenue == 3) {
        this.setStaff = this.allCfStaff;
      }
      else if(this.showVenue = 99) {
        this.setStaff = this.allStaff;
      }
    }
  }

  changeVenue(change) {
    if(change.venueSelect == 1) {
      this.showVenue = 1;
      this.allStaff = this.staffService.returnAllPncStaff();
      this.activeStaff = this.staffService.returnActivePncStaff();
      this.inactiveStaff = this.staffService.returnInactivePncStaff();
      this.interestedStaff = this.staffService.returnInterestedPncStaff();
    }
    else if(change.venueSelect == 2) {
      this.showVenue = 2;
      this.allStaff = this.staffService.returnAllWcStaff();
      this.activeStaff = this.staffService.returnActiveWcStaff();
      this.inactiveStaff = this.staffService.returnInactiveWcStaff();
      this.interestedStaff = this.staffService.returnInterestedWcStaff();
    }
    else if(change.venueSelect == 3) {
      this.showVenue = 3;
      this.allStaff = this.staffService.returnAllCfStaff();
      this.activeStaff = this.staffService.returnActiveCfStaff();
      this.inactiveStaff = this.staffService.returnInactiveCfStaff();
      this.interestedStaff = this.staffService.returnInterestedCfStaff();
    }
    else if(change.venueSelect == 99) {
      this.showVenue = 99;
      this.allStaff = this.staffService.returnAllStaff();
      this.activeStaff = this.staffService.returnActiveStaff();
      this.inactiveStaff = this.staffService.returnInactiveStaff();
      this.interestedStaff = this.staffService.returnInterestedStaff();
    }
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
        if(download) {
          window.open(window.URL.createObjectURL(data));
        }
        this.onCancelMonthlyReport();
      });
    }
  }

}

