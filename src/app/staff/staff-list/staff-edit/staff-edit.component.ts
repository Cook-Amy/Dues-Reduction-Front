import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StaffService } from './../../staff.service';
import { Staff } from './../../../models/staff.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit {
@Input() staffPnc: Staff;
@Input() staffWc: Staff;
@Input() staffCf: Staff;
@Input() currentVenueID: number;

editStaffForm1: FormGroup;
editStaffForm2: FormGroup;
editStaffForm3: FormGroup;
editStaff: Staff;
status: string;
dateValue: Date;

  constructor(private staffService: StaffService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    if(this.currentVenueID == 1) {
      if(this.staffPnc.pncActive) {this.status = "pncActive";}
      else if(this.staffPnc.pncInactive) {this.status = "pncInactive";}
      else if(this.staffPnc.pncInterested) {this.status = "pncInterested";}
      this.initForm1();
    }
    else if(this.currentVenueID == 2) {
      if(this.staffWc.wcActive) {this.status = "wcActive";}
      else if(this.staffWc.wcInactive) {this.status = "wcInactive";}
      else if(this.staffWc.wcInterested) {this.status = "wcInterested";}
      this.initForm2();
    }
    else if(this.currentVenueID == 3) {
      if(this.staffCf.cfActive) {this.status = "cfActive";}
      else if(this.staffCf.cfInactive) {this.status = "cfInactive";}
      else if(this.staffCf.cfInterested) {this.status = "cfInterested";}
      this.initForm3()
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
    let firstName: string = this.staffPnc.firstName;
    let lastName: string = this.staffPnc.lastName;
    let email: string = this.staffPnc.Email;
    let phone: string = this.staffPnc.Phone;
    let tuAccount: string = this.staffPnc.tuAccount;
    let active = this.status;
    let pncHealthForm = this.staffPnc.pncHealthForm;
    let pncExperienced = this.staffPnc.pncExperienced;
    let pncBars: string = this.staffPnc.pncBars;
    if(!pncBars) {
      pncBars = "";
      this.dateValue = this.getToday();
    }
    else { this.dateValue = new Date(pncBars); }
    let pncBarsRefresher = this.staffPnc.pncBarsRefresher;
    let pncWaiver = this.staffPnc.pncWaiver;

    this.editStaffForm1 = new FormGroup({
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
    let firstName: string = this.staffWc.firstName;
    let lastName: string = this.staffWc.lastName;
    let email: string = this.staffWc.Email;
    let phone: string = this.staffWc.Phone;
    let tuAccount: string = this.staffWc.tuAccount;
    let active = this.status;
    let wcTeamTraining: string = this.staffWc.wcTeamTraining;
    if(!wcTeamTraining) {
      wcTeamTraining = "";
      this.dateValue = this.getToday();
    }
    else { this.dateValue = new Date(wcTeamTraining); }

    this.editStaffForm2 = new FormGroup({
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
    let firstName: string = this.staffCf.firstName;
    let lastName: string = this.staffCf.lastName;
    let email: string = this.staffCf.Email;
    let phone: string = this.staffCf.Phone;
    let tuAccount: string = this.staffCf.tuAccount;
    let active = this.status;
    let cfAlcoholTraining: string = this.staffCf.cfAlcoholTraining;
    if(!cfAlcoholTraining) {
      cfAlcoholTraining = "";
      this.dateValue = this.getToday();
    }
    else { this.dateValue = new Date(cfAlcoholTraining); }

    this.editStaffForm3 = new FormGroup({
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
    if(this.currentVenueID == 1) {
      this.updateStaffPnc();
      this.staffService.updateStaffInDB(this.staffPnc).subscribe(res => {
        this.staffService.getAllStaff().subscribe(staff => {
          this.staffService.setAllStaff(staff);
          this.onCancel();
        })
      })
    }
    else if(this.currentVenueID == 2) {
      this.updateStaffWc();
      this.staffService.updateStaffInDB(this.staffWc).subscribe(res => {
        this.staffService.getAllStaff().subscribe(staff => {
          this.staffService.setAllStaff(staff);
          this.onCancel();
        })
      })
    }
    if(this.currentVenueID == 3) {
      this.updateStaffCf();
      this.staffService.updateStaffInDB(this.staffCf).subscribe(res => {
        this.staffService.getAllStaff().subscribe(staff => {
          this.staffService.setAllStaff(staff);
          this.onCancel();
        })
      })
    }
  }

  onCancel() {
    this.staffService.setstaffEdit(false);
    // this.router.navigate([], {relativeTo: this.route});
  }

  updateStaffPnc() {
    var newStatus = this.editStaffForm1.value['active'];
      var active;
      var inactive;
      var interested;
      if(newStatus == "pncActive") {
        active = true;
        inactive = false;
        interested = false;
      }
      if(newStatus == "pncInactive") {
        active = false;
        inactive = true;
        interested = false;
      }
      if(newStatus == "pncInterested") {
        active = false;
        inactive = false;
        interested = true;
      }
    this.staffPnc.Name = this.editStaffForm1.value['lastName'] + ", " + this.editStaffForm1.value['firstName'];
    this.staffPnc.firstName = this.editStaffForm1.value['firstName'];
    this.staffPnc.lastName = this.editStaffForm1.value['lastName'];
    this.staffPnc.tuAccount = this.editStaffForm1.value['tuAccount'];
    this.staffPnc.Email = this.editStaffForm1.value['email'];
    this.staffPnc.Phone = this.editStaffForm1.value['phone'];
    this.staffPnc.pncActive = active;
    this.staffPnc.pncInactive = inactive;
    this.staffPnc.pncInterested = interested;
    this.staffPnc.pncHealthForm = this.editStaffForm1.value['pncHealthForm'];
    this.staffPnc.pncExperienced = this.editStaffForm1.value['pncExperienced'];
    this.staffPnc.pncBars = this.editStaffForm1.value['pncBars'];
    this.staffPnc.pncBarsRefresher = this.editStaffForm1.value['pncBarsRefresher'];
    this.staffPnc.pncWaiver = this.editStaffForm1.value['pncWaiver'];

    // console.log("wc: " + this.staffPnc.wcActive + " , " + this.staffPnc.wcInactive + " , " + this.staffPnc.wcInterested);
  }

  updateStaffWc() {
    var newStatus = this.editStaffForm2.value['active'];
      var active;
      var inactive;
      var interested;
      if(newStatus == "wcActive") {
        active = true;
        inactive = false;
        interested = false;
      }
      if(newStatus == "wcInactive") {
        active = false;
        inactive = true;
        interested = false;
      }
      if(newStatus == "wcInterested") {
        active = false;
        inactive = false;
        interested = true;
      }
    this.staffWc.Name = this.editStaffForm2.value['lastName'] + ", " + this.editStaffForm2.value['firstName'];
    this.staffWc.firstName = this.editStaffForm2.value['firstName'];
    this.staffWc.lastName = this.editStaffForm2.value['lastName'];
    this.staffWc.tuAccount = this.editStaffForm2.value['tuAccount'];
    this.staffWc.Email = this.editStaffForm2.value['email'];
    this.staffWc.Phone = this.editStaffForm2.value['phone'];
    this.staffWc.wcActive = active;
    this.staffWc.wcInactive = inactive;
    this.staffWc.wcInterested = interested;
    this.staffWc.wcTeamTraining = this.editStaffForm2.value['wcTeamTraining'];
  }

  updateStaffCf() {
    var newStatus = this.editStaffForm3.value['active'];
      var active;
      var inactive;
      var interested;
      if(newStatus == "cfActive") {
        active = true;
        inactive = false;
        interested = false;
      }
      if(newStatus == "cfInactive") {
        active = false;
        inactive = true;
        interested = false;
      }
      if(newStatus == "cfInterested") {
        active = false;
        inactive = false;
        interested = true;
      }
    this.staffCf.Name = this.editStaffForm3.value['lastName'] + ", " + this.editStaffForm3.value['firstName'];
    this.staffCf.firstName = this.editStaffForm3.value['firstName'];
    this.staffCf.lastName = this.editStaffForm3.value['lastName'];
    this.staffCf.tuAccount = this.editStaffForm3.value['tuAccount'];
    this.staffCf.Email = this.editStaffForm3.value['email'];
    this.staffCf.Phone = this.editStaffForm3.value['phone'];
    this.staffCf.cfActive = active;
    this.staffCf.cfInactive = inactive;
    this.staffCf.cfInterested = interested;
    this.staffCf.cfAlcoholTraining = this.editStaffForm3.value['cfAlcoholTraining'];
  }
}
