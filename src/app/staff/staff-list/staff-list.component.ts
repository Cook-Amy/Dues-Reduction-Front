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

  staffNew: Boolean;
  activityLevel: number = 1;

  constructor(private staffService: StaffService,
              private venueService: VenueService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.currentVenue = this.venueService.getCurrentVenue();
    this.currentVenueID = this.currentVenue.idvenue;
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
      if(this.currentVenueID == 1) {
        this.setStaff = this.activePncStaff;
      }
      else if(this.currentVenueID == 2) {
        this.setStaff = this.activeWcStaff;
      }
      else if(this.currentVenueID == 3) {
        this.setStaff = this.activeCfStaff;
      }
    }
    else if(this.activityLevel == 2) {
      if(this.currentVenueID == 1) {
        this.setStaff = this.inactivePncStaff;
      }
      else if(this.currentVenueID == 2) {
        this.setStaff = this.inactiveWcStaff;
      }
      else if(this.currentVenueID == 3) {
        this.setStaff = this.inactiveCfStaff;
      }
    }
    else if(this.activityLevel == 3) {
      if(this.currentVenueID == 1) {
        this.setStaff = this.interestedPncStaff;
      }
      else if(this.currentVenueID == 2) {
        this.setStaff = this.interestedWcStaff;
      }
      else if(this.currentVenueID == 3) {
        this.setStaff = this.interestedCfStaff;
      }
    }
    else if(this.activityLevel == 4) {
      if(this.currentVenueID == 1) {
        this.setStaff = this.allPncStaff;
      }
      else if(this.currentVenueID == 2) {
        this.setStaff = this.allWcStaff;
      }
      else if(this.currentVenueID == 3) {
        this.setStaff = this.allCfStaff;
      }
    }

  }

 

  changeActive(value) {
    // console.log("value: " + value.activeSelect);

    // Activity level set to active
    if(value.activeSelect == 1) {
      if(this.currentVenueID == 1) {
        this.setStaff = this.activePncStaff;
      }
      else if(this.currentVenueID == 2) {
        this.setStaff = this.activeWcStaff;
      } 
      else if(this.currentVenueID == 3) {
        this.setStaff = this.activeCfStaff;
      }
    }

    // Activity level set to inactive
    if(value.activeSelect == 2) {
      if(this.currentVenueID == 1) {
        this.setStaff = this.inactivePncStaff;
      }
      else if(this.currentVenueID == 2) {
        this.setStaff = this.inactiveWcStaff;
      } 
      else if(this.currentVenueID == 3) {
        this.setStaff = this.inactiveCfStaff;
      }
    }

    // Activity level set to interested
    if(value.activeSelect == 3) {
      if(this.currentVenueID == 1) {
        this.setStaff = this.interestedPncStaff;
      }
      else if(this.currentVenueID == 2) {
        this.setStaff = this.interestedWcStaff;
      } 
      else if(this.currentVenueID == 3) {
        this.setStaff = this.interestedCfStaff;
      }
    }


    // Activity level set to all
    if(value.activeSelect == 4) {
      if(this.currentVenueID == 1) {
        this.setStaff = this.allPncStaff;
      }
      else if(this.currentVenueID == 2) {
        this.setStaff = this.allWcStaff;
      } 
      else if(this.currentVenueID == 3) {
        this.setStaff = this.allCfStaff;
      }
    }
  }

  onAddStaff() {
    this.staffNew = true;
  }

}
