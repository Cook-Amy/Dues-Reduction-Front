import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from './../../staff.service';
import { Staff } from './../../../models/staff.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-staff-new',
  templateUrl: './staff-new.component.html',
  styleUrls: ['./staff-new.component.css']
})
export class StaffNewComponent implements OnInit {
  @Input() currentVenueID: number;
  newStaffForm1: FormGroup;
  newStaffForm2: FormGroup;
  newStaffForm3: FormGroup;
  newStaff: Staff;
  dateValue: Date;

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

  constructor(private staffService: StaffService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.dateValue = this.getToday();

    if(this.currentVenueID == 1) {
      // this.allStaff = this.staffService.returnAllPncStaff();
      this.initForm1();
    }

    if(this.currentVenueID == 2) {
      // this.allStaff = this.staffService.returnAllWcStaff();
      this.initForm2();
    }

    if(this.currentVenueID == 3) {
      // this.allStaff = this.staffService.returnAllCfStaff();
      this.initForm3();
    }
  }

  getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todayDate = new Date(mm + '/' + dd + '/' + yyyy); 
    return todayDate;
  }

  private initForm1() {
    let name: string = "";
    let firstName: string = "";
    let lastName: string = "";
    let email: string = "";
    let phone: string = "";
    let tuAccount: string = "";
    let active = false;
    let pncHealthForm = false;
    let pncExperienced = false;
    let pncBars: string = "";
    let pncBarsRefresher = false;
    let pncWaiver = false;

    this.newStaffForm1 = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'email': new FormControl(email, Validators.required),
      'phone': new FormControl(phone, Validators.required),
      'tuAccount': new FormControl(tuAccount, Validators.required),
      'active': new FormControl(active, Validators.required),
      'pncHealthForm': new FormControl(pncHealthForm, Validators.required),
      'pncExperienced': new FormControl(pncExperienced, Validators.required),
      'pncBars': new FormControl(pncBars, Validators.required),
      'pncBarsRefresher': new FormControl(pncBarsRefresher, Validators.required),
      'pncWaiver': new FormControl(pncWaiver, Validators.required)
    });
  }

  private initForm2() {
    let name: string = "";
    let firstName: string = "";
    let lastName: string = "";
    let email: string = "";
    let phone: string = "";
    let tuAccount: string = "";
    let active: boolean = false;
    let wcTeamTraining: string = "";

    this.newStaffForm2 = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'email': new FormControl(email, Validators.required),
      'phone': new FormControl(phone, Validators.required),
      'tuAccount': new FormControl(tuAccount, Validators.required),
      'active': new FormControl(active, Validators.required),
      'wcTeamTraining': new FormControl(wcTeamTraining, Validators.required)
    });
  }

  private initForm3() {
    let name: string = "";
    let firstName: string = "";
    let lastName: string = "";
    let email: string = "";
    let phone: string = "";
    let tuAccount: string = "";
    let active: boolean = false;
    let cfAlcoholTraining: string = "";

    this.newStaffForm3 = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'email': new FormControl(email, Validators.required),
      'phone': new FormControl(phone, Validators.required),
      'tuAccount': new FormControl(tuAccount, Validators.required),
      'active': new FormControl(active, Validators.required),
      'cfAlcoholTraining': new FormControl(cfAlcoholTraining, Validators.required)
    });
  }

  onSubmit() {
    var newStaff: Staff = this.createNewStaff();
    this.staffService.addNewStaffToDB(newStaff).subscribe(id => {
      newStaff.idperson = id;
      this.staffService.getAllStaff().subscribe(allStaff => {
        this.staffService.setAllStaff(allStaff);
        this.onCancel();
      });
      // this.staffService.addNewStaff(newStaff);
      // if(this.currentVenueID == 1) {
        // this.staffService.getAllPncStaff().subscribe(allStaff => {
        //   this.staffService.setAllPncStaff(allStaff);
        //   this.allPncStaff = this.staffService.returnAllPncStaff();
        //   this.setOtherStaff(this.currentVenueID);
          // this.onCancel();
        //   this.router.navigate([], {relativeTo: this.route});
        // });
      // }
      // else if(this.currentVenueID == 2) {
        // this.onCancel();
      // }
      // else if(this.currentVenueID == 3) {
        // this.onCancel();
      // }
    });
  }

  onCancel() {
    this.staffService.setstaffNew(false);
    // this.router.navigate([], {relativeTo: this.route});
  }

  createNewStaff() {
    var newStaff: Staff;
    if(this.currentVenueID == 1){
      var status = this.newStaffForm1.value['active'];
      var active;
      var inactive;
      var interested;
      if(status == "pncActive") {
        active = true;
        inactive = false;
        interested = false;
      }
      if(status == "pncInactive") {
        active = false;
        inactive = true;
        interested = false;
      }
      if(status == "pncInterested") {
        active = false;
        inactive = false;
        interested = true;
      }
      newStaff = new Staff(
        0,
        this.newStaffForm1.value['firstName'],
        this.newStaffForm1.value['lastName'],
        this.newStaffForm1.value['name'],
        this.newStaffForm1.value['email'],
        this.newStaffForm1.value['phone'],
        this.newStaffForm1.value['tuAccount'],
        active,
        inactive,
        interested,
        false,
        true,
        false,
        false,
        true,
        false,
        this.newStaffForm1.value['pncHealthForm'],
        this.newStaffForm1.value['pncExperienced'],
        this.newStaffForm1.value['pncBars'],
        false,
        this.newStaffForm1.value['pncWaiver'],
        null,
        null
      );
    }

    else if(this.currentVenueID == 2){
      var status = this.newStaffForm2.value['active'];
      var active;
      var inactive;
      var interested;
      if(status == "wcActive") {
        active = true;
        inactive = false;
        interested = false;
      }
      if(status == "wcInactive") {
        active = false;
        inactive = true;
        interested = false;
      }
      if(status == "wcInterested") {
        active = false;
        inactive = false;
        interested = true;
      }
      newStaff = new Staff(
        0,
        this.newStaffForm2.value['firstName'],
        this.newStaffForm2.value['lastName'],
        this.newStaffForm2.value['name'],
        this.newStaffForm2.value['email'],
        this.newStaffForm2.value['phone'],
        this.newStaffForm2.value['tuAccount'],
        false,
        true,
        false,
        active,
        inactive,
        interested,
        false,
        true,
        false,
        false,
        false,
        null,
        false,
        false,
        this.newStaffForm2.value['wcTeamTraining'],
        null
      );
    }

    else if(this.currentVenueID == 3){
      var status = this.newStaffForm3.value['active'];
      var active;
      var inactive;
      var interested;
      if(status == "cfActive") {
        active = true;
        inactive = false;
        interested = false;
      }
      if(status == "cfInactive") {
        active = false;
        inactive = true;
        interested = false;
      }
      if(status == "cfInterested") {
        active = false;
        inactive = false;
        interested = true;
      }
      newStaff = new Staff(
        0,
        this.newStaffForm3.value['firstName'],
        this.newStaffForm3.value['lastName'],
        this.newStaffForm3.value['name'],
        this.newStaffForm3.value['email'],
        this.newStaffForm3.value['phone'],
        this.newStaffForm3.value['tuAccount'],
        false,
        true,
        false,
        false,
        true,
        false,
        active,
        inactive,
        interested,
        false,
        false,
        null,
        false,
        false,
        null,
        this.newStaffForm3.value['cfAlcoholTrianing']
      );
    }
    return newStaff;
  }

  

}
