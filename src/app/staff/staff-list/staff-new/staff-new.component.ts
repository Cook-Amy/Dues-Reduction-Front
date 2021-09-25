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
  newStaffForm99: FormGroup;
  newStaff: Staff;
  dateValue: Date;
  allTuAccounts: any[];

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

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.dateValue = this.getToday();
    this.allTuAccounts = this.staffService.returnAllTuAccounts();

    if(this.currentVenueID == 1) {
      this.initForm1();
    }

    else if(this.currentVenueID == 2) {
      this.initForm2();
    }

    else if(this.currentVenueID == 3) {
      this.initForm3();
    }

    else if(this.currentVenueID == 99) {
      this.initForm99();
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

  private initForm99() {
    let name: string = "";
    let firstName: string = "";
    let lastName: string = "";
    let email: string = "";
    let phone: string = "";
    let tuAccount: string = "";

    let active1 = false;
    let active2 = false;
    let active3 = false;

    // pnc stuff
    let pncHealthForm = false;
    let pncExperienced = false;
    let pncBars: string = "";
    let pncBarsRefresher = false;
    let pncWaiver = false;

    // wc stuff
    let wcTeamTraining: string = "";

    // cf stuff
    let cfAlcoholTraining: string = "";

    this.newStaffForm99 = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'email': new FormControl(email, Validators.required),
      'phone': new FormControl(phone, Validators.required),
      'tuAccount': new FormControl(tuAccount, Validators.required),
      'active1': new FormControl(active1, Validators.required),
      'active2': new FormControl(active2, Validators.required),
      'active3': new FormControl(active3, Validators.required),
      'pncHealthForm': new FormControl(pncHealthForm, Validators.required),
      'pncExperienced': new FormControl(pncExperienced, Validators.required),
      'pncBars': new FormControl(pncBars, Validators.required),
      'pncBarsRefresher': new FormControl(pncBarsRefresher, Validators.required),
      'pncWaiver': new FormControl(pncWaiver, Validators.required),
      'wcTeamTraining': new FormControl(wcTeamTraining, Validators.required),
      'cfAlcoholTraining': new FormControl(cfAlcoholTraining, Validators.required)
    });
  }

  onSubmit() {
    var newStaff: Staff = this.createNewStaff();
    this.staffService.addNewStaffToDB(newStaff).subscribe(id => {
      newStaff.idperson = id;
      this.staffService.getAllStaff().subscribe(allStaff => {
        console.log(JSON.stringify(allStaff));
        var formattedStaff: Staff[] = this.staffService.formatAllStaffResults(allStaff);
        this.staffService.setAllStaff(formattedStaff);
        this.onCancel();
      });
    });
  }

  onCancel() {
    this.staffService.setstaffNew(false);
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
        false, false, false, false, false, false,
        null,
        false, false, false, false, false,
        null,
        false, false, false
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
        false, false, false, false, false, false,
        this.newStaffForm2.value['wcTeamTraining'],
        false, false, false, false, false,
        null,
        false, false, false
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
        false, false, false, false, false, false,
        null,
        false, false, false, false, false,
        this.newStaffForm3.value['cfAlcoholTrianing'],
        false, false, false
      );
    }

    if(this.currentVenueID == 99){
      var status1 = this.newStaffForm99.value['active1'];
      var active1;
      var inactive1;
      var interested1;
      if(status1 == "pncActive") {
        active1 = true;
        inactive1 = false;
        interested1 = false;
      }
      if(status1 == "pncInactive") {
        active1 = false;
        inactive1 = true;
        interested1 = false;
      }
      if(status1 == "pncInterested") {
        active1 = false;
        inactive1 = false;
        interested1 = true;
      }

      var status2 = this.newStaffForm99.value['active2'];
      var active2;
      var inactive2;
      var interested2;
      if(status2 == "wcActive") {
        active2 = true;
        inactive2 = false;
        interested2 = false;
      }
      if(status2 == "wcInactive") {
        active2 = false;
        inactive2 = true;
        interested2 = false;
      }
      if(status2 == "wcInterested") {
        active2 = false;
        inactive2 = false;
        interested2 = true;
      }

      var status3 = this.newStaffForm99.value['active3'];
      var active3;
      var inactive3;
      var interested3;
      if(status3 == "cfActive") {
        active3 = true;
        inactive3 = false;
        interested3 = false;
      }
      if(status3 == "cfInactive") {
        active3 = false;
        inactive3 = true;
        interested3 = false;
      }
      if(status3 == "cfInterested") {
        active3 = false;
        inactive3 = false;
        interested3 = true;
      }

      newStaff = new Staff(
        0,
        this.newStaffForm99.value['firstName'],
        this.newStaffForm99.value['lastName'],
        this.newStaffForm99.value['name'],
        this.newStaffForm99.value['email'],
        this.newStaffForm99.value['phone'],
        this.newStaffForm99.value['tuAccount'],
        active1,
        inactive1,
        interested1,
        active2,
        inactive2,
        interested2,
        active3,
        inactive3,
        interested3,
        this.newStaffForm99.value['pncHealthForm'],
        this.newStaffForm99.value['pncExperienced'],
        this.newStaffForm99.value['pncBars'],
        false,
        this.newStaffForm99.value['pncWaiver'],
        false, false, false, false, false, false,
        this.newStaffForm99.value['wcTeamTraining'],
        false, false, false, false, false,
        this.newStaffForm99.value['cfAlcoholTrianing'],
        false, false, false
      );
    }
    return newStaff;
  }

  

}
