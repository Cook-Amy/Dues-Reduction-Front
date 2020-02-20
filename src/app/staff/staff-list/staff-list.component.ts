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

  constructor(private staffService: StaffService,
              private venueService: VenueService) { }

  ngOnInit() {
    this.currentVenue = this.venueService.getCurrentVenue();
    this.currentVenueID = this.currentVenue.idvenue;
    this.getAllStaff(this.currentVenueID);
  }

  getAllStaff(id) {
    if(id == 1) {
      this.staffService.getAllPncStaff().subscribe(allPncStaff => {
        this.staffService.setAllPncStaff(allPncStaff);
        this.allPncStaff = this.staffService.returnAllPncStaff();
        // console.log("1: " + this.allPncStaff[1].Email);
        // console.log("Results returned from DB for PNC: " + this.allPncStaff.length);
        this.setOtherStaff(id)
      });
    }

    else if(id == 2) {
      this.staffService.getAllWcStaff().subscribe(allWcStaff => {
        this.staffService.setAllWcStaff(allWcStaff);
        this.allWcStaff = this.staffService.returnAllWcStaff();
        // console.log("Results returned from DB for WC: " + this.allWcStaff.length);
        this.setOtherStaff(id)
      });
    }

    else if(id == 3) {
      this.staffService.getAllCfStaff().subscribe(allCfStaff => {
        this.staffService.setAllCfStaff(allCfStaff);
        this.allCfStaff = this.staffService.returnAllCfStaff();
        // console.log("Results returned from DB for CF: " + this.allCfStaff.length);

        this.setOtherStaff(id)
      });
    }
  }

  setOtherStaff(id) {
    if(id == 1) {
      for(var i = 0; i < this.allPncStaff.length; i++) {
        if(this.allPncStaff[i].pncActive) {
          this.activePncStaff.push(this.allPncStaff[i]);
        }
        if(this.allPncStaff[i].pncInactive) {
          this.inactivePncStaff.push(this.allPncStaff[i]);
        }
        if(this.allPncStaff[i].pncInterested) {
          this.interestedPncStaff.push(this.allPncStaff[i]);
        }
      }
      this.staffService.setActivePncStaff(this.activePncStaff);
      this.activePncStaff = this.staffService.returnActivePncStaff();
      this.setStaff = this.activePncStaff;
      // console.log("active PNC staff: " + this.activePncStaff.length);

      this.staffService.setInactivePncStaff(this.inactivePncStaff);
      this.inactivePncStaff = this.staffService.returnInactivePncStaff();
      this.staffService.setInterestedPncStaff(this.interestedPncStaff);
      this.interestedPncStaff = this.staffService.returnInterestedPncStaff();
    }

    else if(id == 2) {
      for(var i = 0; i < this.allWcStaff.length; i++) {
        if(this.allWcStaff[i].wcActive) {
          this.activeWcStaff.push(this.allWcStaff[i]);
        }
        if(this.allWcStaff[i].wcInactive) {
          this.inactiveWcStaff.push(this.allWcStaff[i]);
        }
        if(this.allWcStaff[i].wcInterested) {
          this.interestedWcStaff.push(this.allWcStaff[i]);
        }
      }
      this.staffService.setActiveWcStaff(this.activeWcStaff);
      this.activeWcStaff = this.staffService.returnActiveWcStaff();
      this.setStaff = this.activeWcStaff;
      // console.log("active WC staff: " + this.activeWcStaff.length);

      this.staffService.setInactiveWcStaff(this.inactiveWcStaff);
      this.inactiveWcStaff = this.staffService.returnInactiveWcStaff();
      this.staffService.setInterestedWcStaff(this.interestedWcStaff);
      this.interestedWcStaff = this.staffService.returnInterestedWcStaff();
    }

    else if(id == 3) {
      for(var i = 0; i < this.allCfStaff.length; i++) {
        if(this.allCfStaff[i].cfActive) {
          this.activeCfStaff.push(this.allCfStaff[i]);
        }
        if(this.allCfStaff[i].cfInactive) {
          this.inactiveCfStaff.push(this.allCfStaff[i]);
        }
        if(this.allCfStaff[i].cfInterested) {
          this.interestedCfStaff.push(this.allCfStaff[i]);
        }
      }
      this.staffService.setActiveCfStaff(this.activeCfStaff);
      this.activeCfStaff = this.staffService.returnActiveCfStaff();
      this.setStaff = this.activeCfStaff;
      // console.log("active CF staff: " + this.activeCfStaff.length);
      this.staffService.setInactiveCfStaff(this.inactiveCfStaff);
      this.inactiveCfStaff = this.staffService.returnInactiveCfStaff();
      this.staffService.setInterestedCfStaff(this.interestedCfStaff);
      this.interestedCfStaff = this.staffService.returnInterestedCfStaff();
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

}
