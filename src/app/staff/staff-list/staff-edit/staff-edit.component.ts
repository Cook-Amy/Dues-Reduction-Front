
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
@Input() staff: Staff;
@Input() currentVenueID: number;
@Input() showVenue: number;

allTuAccounts: any[];
editStaffForm1: FormGroup;
editStaffForm2: FormGroup;
editStaffForm3: FormGroup;
editStaffForm99: FormGroup;
editStaff: Staff;
status1: string;
status2: string;
status3: string;
dateValue: Date;
dateValue2: Date;
dateValue3: Date;
removeStaffConfirm: Boolean = false;

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.allTuAccounts = this.staffService.returnAllTuAccounts();

    if(this.currentVenueID == 1) {
      if(this.staff.pncActive) {this.status1 = "pncActive";}
      else if(this.staff.pncInactive) {this.status1 = "pncInactive";}
      else if(this.staff.pncInterested) {this.status1 = "pncInterested";}
      this.initForm1();
    }
    else if(this.currentVenueID == 2) {
      if(this.staff.wcActive) {this.status1 = "wcActive";}
      else if(this.staff.wcInactive) {this.status1 = "wcInactive";}
      else if(this.staff.wcInterested) {this.status1 = "wcInterested";}
      this.initForm2();
    }
    else if(this.currentVenueID == 3) {
      if(this.staff.cfActive) {this.status1 = "cfActive";}
      else if(this.staff.cfInactive) {this.status1 = "cfInactive";}
      else if(this.staff.cfInterested) {this.status1 = "cfInterested";}
      this.initForm3()
    }

    else if(this.currentVenueID == 99) {
      if(this.staff.pncActive) {this.status1 = "pncActive";}
      else if(this.staff.pncInactive) {this.status1 = "pncInactive";}
      else if(this.staff.pncInterested) {this.status1 = "pncInterested";}
      if(this.staff.cfActive) {this.status2 = "cfActive";}
      else if(this.staff.cfInactive) {this.status2 = "cfInactive";}
      else if(this.staff.cfInterested) {this.status2 = "cfInterested";}
      if(this.staff.wcActive) {this.status3 = "wcActive";}
      else if(this.staff.wcInactive) {this.status3 = "wcInactive";}
      else if(this.staff.wcInterested) {this.status3 = "wcInterested";}
      this.initForm99()
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
    let firstName: string = this.staff.firstName;
    let lastName: string = this.staff.lastName;
    let email: string = this.staff.Email;
    let phone: string = this.staff.Phone;
    let tuAccount: string = this.staff.tuAccount;
    let active = this.status1;
    let pncHealthForm = this.staff.pncHealthForm;
    let pncExperienced = this.staff.pncExperienced;
    let pncBars: string = this.staff.pncBars;
    if(!pncBars) {
      pncBars = "";
      this.dateValue = this.getToday();
    }
    else { this.dateValue = new Date(pncBars); }
    let pncBarsRefresher = this.staff.pncBarsRefresher;
    let pncWaiver = this.staff.pncWaiver;

    let active1 = this.status1;
    let active2 = this.status2;
    let active3 = this.status3;

    let pncStandLeader = this.staff.pncStandLeader;
    let pncGroupLeader = this.staff.pncGroupLeader;
    let pncHeadCook = this.staff.pncHeadCook;
    let pncRegister = this.staff.pncRegister;
    let pncAssistantCook = this.staff.pncAssistantCook;
    let pncBeerCart = this.staff.pncBeerCart;

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
      'pncWaiver': new FormControl(pncWaiver, Validators.required),
      'active1': new FormControl(active1, Validators.required),
      'active2': new FormControl(active2, Validators.required),
      'active3': new FormControl(active3, Validators.required),
      'pncStandLeader': new FormControl(pncStandLeader, Validators.required),
      'pncGroupLeader': new FormControl(pncGroupLeader, Validators.required),
      'pncHeadCook': new FormControl(pncHeadCook, Validators.required),
      'pncRegister': new FormControl(pncRegister, Validators.required),
      'pncAssistantCook': new FormControl(pncAssistantCook, Validators.required),
      'pncBeerCart': new FormControl(pncBeerCart, Validators.required)
    });
  }

  private initForm2() {
    let firstName: string = this.staff.firstName;
    let lastName: string = this.staff.lastName;
    let email: string = this.staff.Email;
    let phone: string = this.staff.Phone;
    let tuAccount: string = this.staff.tuAccount;
    let active = this.status1;
    let wcTeamTraining: string = this.staff.wcTeamTraining;
    if(!wcTeamTraining) {
      wcTeamTraining = "";
      this.dateValue = this.getToday();
    }
    else { this.dateValue = new Date(wcTeamTraining); }

    let active1 = this.status1;
    let active2 = this.status2;
    let active3 = this.status3;

    let wcStandLeader = this.staff.wcStandLeader;
    let wcMoveStockOut = this.staff.wcMoveStockOut;
    let wcContainerBarLead = this.staff.wcContainerBarLead;
    let wcFinalStandPrep = this.staff.wcFinalStandPrep;
    let wcSales = this.staff.wcSales;

    this.editStaffForm2 = new FormGroup({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'email': new FormControl(email, Validators.required),
      'phone': new FormControl(phone, Validators.required),
      'tuAccount': new FormControl(tuAccount, Validators.required),
      'active': new FormControl(active, Validators.required),
      'wcTeamTraining': new FormControl(wcTeamTraining, Validators.required),
      'active1': new FormControl(active1, Validators.required),
      'active2': new FormControl(active2, Validators.required),
      'active3': new FormControl(active3, Validators.required),
      'wcStandLeader': new FormControl(wcStandLeader, Validators.required),
      'wcMoveStockOut': new FormControl(wcMoveStockOut, Validators.required),
      'wcContainerBarLead': new FormControl(wcContainerBarLead, Validators.required),
      'wcFinalStandPrep': new FormControl(wcFinalStandPrep, Validators.required),
      'wcSales': new FormControl(wcSales, Validators.required)
    });
  }

  private initForm3() {
    let firstName: string = this.staff.firstName;
    let lastName: string = this.staff.lastName;
    let email: string = this.staff.Email;
    let phone: string = this.staff.Phone;
    let tuAccount: string = this.staff.tuAccount;
    let active = this.status1;
    let cfAlcoholTraining: string = this.staff.cfAlcoholTraining;
    if(!cfAlcoholTraining) {
      cfAlcoholTraining = "";
      this.dateValue = this.getToday();
    }
    else { this.dateValue = new Date(cfAlcoholTraining); }

    let active1 = this.status1;
    let active2 = this.status2;
    let active3 = this.status3;

    let cfLeader = this.staff.cfLeader;
    let cfAssistantLeader = this.staff.cfAssistantLeader;
    let cfStaff = this.staff.cfStaff;

    this.editStaffForm3 = new FormGroup({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'email': new FormControl(email, Validators.required),
      'phone': new FormControl(phone, Validators.required),
      'tuAccount': new FormControl(tuAccount, Validators.required),
      'active': new FormControl(active, Validators.required),
      'cfAlcoholTraining': new FormControl(cfAlcoholTraining, Validators.required),
      'active1': new FormControl(active1, Validators.required),
      'active2': new FormControl(active2, Validators.required),
      'active3': new FormControl(active3, Validators.required),
      'cfLeader': new FormControl(cfLeader, Validators.required),
      'cfAssistantLeader': new FormControl(cfAssistantLeader, Validators.required),
      'cfStaff': new FormControl(cfStaff, Validators.required)
    });
  }

  initForm99() {
    let firstName: string = this.staff.firstName;
    let lastName: string = this.staff.lastName;
    let email: string = this.staff.Email;
    let phone: string = this.staff.Phone;
    let tuAccount: string = this.staff.tuAccount;

    let active1 = this.status1;
    let active2 = this.status2;
    let active3 = this.status3;

    // PNC Stuff
    let pncHealthForm = this.staff.pncHealthForm;
    let pncExperienced = this.staff.pncExperienced;
    let pncBars: string = this.staff.pncBars;
    if(!pncBars) {
      pncBars = "";
      this.dateValue = this.getToday();
    }
    else { this.dateValue = new Date(pncBars); }
    let pncBarsRefresher = this.staff.pncBarsRefresher;
    let pncWaiver = this.staff.pncWaiver;
    let pncStandLeader = this.staff.pncStandLeader;
    let pncGroupLeader = this.staff.pncGroupLeader;
    let pncHeadCook = this.staff.pncHeadCook;
    let pncRegister = this.staff.pncRegister;
    let pncAssistantCook = this.staff.pncAssistantCook;
    let pncBeerCart = this.staff.pncBeerCart;

    // WC stuff
    let wcTeamTraining: string = this.staff.wcTeamTraining;
    if(!wcTeamTraining) {
      wcTeamTraining = "";
      this.dateValue2 = this.getToday();
    }
    else { this.dateValue2 = new Date(wcTeamTraining); }
    let wcStandLeader = this.staff.wcStandLeader;
    let wcMoveStockOut = this.staff.wcMoveStockOut;
    let wcContainerBarLead = this.staff.wcContainerBarLead;
    let wcFinalStandPrep = this.staff.wcFinalStandPrep;
    let wcSales = this.staff.wcSales;

    // CF stuff
    let cfAlcoholTraining: string = this.staff.cfAlcoholTraining;
    if(!cfAlcoholTraining) {
      cfAlcoholTraining = "";
      this.dateValue3 = this.getToday();
    }
    else { this.dateValue3 = new Date(cfAlcoholTraining); }
    let cfLeader = this.staff.cfLeader;
    let cfAssistantLeader = this.staff.cfAssistantLeader;
    let cfStaff = this.staff.cfStaff;

    this.editStaffForm99 = new FormGroup({
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
      'cfAlcoholTraining': new FormControl(cfAlcoholTraining, Validators.required),
      'pncStandLeader': new FormControl(pncStandLeader, Validators.required),
      'pncGroupLeader': new FormControl(pncGroupLeader, Validators.required),
      'pncHeadCook': new FormControl(pncHeadCook, Validators.required),
      'pncRegister': new FormControl(pncRegister, Validators.required),
      'pncAssistantCook': new FormControl(pncAssistantCook, Validators.required),
      'pncBeerCart': new FormControl(pncBeerCart, Validators.required),
      'wcStandLeader': new FormControl(wcStandLeader, Validators.required),
      'wcMoveStockOut': new FormControl(wcMoveStockOut, Validators.required),
      'wcContainerBarLead': new FormControl(wcContainerBarLead, Validators.required),
      'wcFinalStandPrep': new FormControl(wcFinalStandPrep, Validators.required),
      'wcSales': new FormControl(wcSales, Validators.required),
      'cfLeader': new FormControl(cfLeader, Validators.required),
      'cfAssistantLeader': new FormControl(cfAssistantLeader, Validators.required),
      'cfStaff': new FormControl(cfStaff, Validators.required)
    });
  }

  onSubmit() {
    if(this.currentVenueID == 1) {
      this.updateStaffPnc();
    }
    else if(this.currentVenueID == 2) {
      this.updateStaffWc();
    }
    else if(this.currentVenueID == 3) {
      this.updateStaffCf();
    }
    else if(this.currentVenueID == 99) {
      this.updateStaffAll();
    }

    this.staffService.updateStaffInDB(this.staff).subscribe(res => {
      this.staffService.getAllStaff().subscribe(staff => {
        var formattedStaff: Staff[] = this.staffService.formatAllStaffResults(staff);
        this.staffService.setAllStaff(formattedStaff);
        this.onCancel();
      });
    });
  }

  onCancel() {
    this.staffService.setstaffEdit(false);
  }

  updateStaffPnc() {
    var newStatus = this.editStaffForm1.value['active1'];
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
    this.staff.Name = this.editStaffForm1.value['lastName'] + ", " + this.editStaffForm1.value['firstName'];
    this.staff.firstName = this.editStaffForm1.value['firstName'];
    this.staff.lastName = this.editStaffForm1.value['lastName'];
    this.staff.tuAccount = this.editStaffForm1.value['tuAccount'];
    this.staff.Email = this.editStaffForm1.value['email'];
    this.staff.Phone = this.editStaffForm1.value['phone'];
    this.staff.pncActive = active;
    this.staff.pncInactive = inactive;
    this.staff.pncInterested = interested;
    this.staff.pncHealthForm = this.editStaffForm1.value['pncHealthForm'];
    this.staff.pncExperienced = this.editStaffForm1.value['pncExperienced'];
    this.staff.pncBars = this.editStaffForm1.value['pncBars'];
    this.staff.pncBarsRefresher = this.editStaffForm1.value['pncBarsRefresher'];
    this.staff.pncWaiver = this.editStaffForm1.value['pncWaiver'];
    this.staff.pncStandLeader = this.editStaffForm1.value['pncStandLeader'];
    this.staff.pncGroupLeader = this.editStaffForm1.value['pncGroupLeader'];
    this.staff.pncHeadCook = this.editStaffForm1.value['pncHeadCook'];
    this.staff.pncRegister = this.editStaffForm1.value['pncRegister'];
    this.staff.pncAssistantCook = this.editStaffForm1.value['pncAssistantCook'];
    this.staff.pncBeerCart = this.editStaffForm1.value['pncBeerCart'];
  }

  updateStaffWc() {
    var newStatus = this.editStaffForm2.value['active1'];
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
    this.staff.Name = this.editStaffForm2.value['lastName'] + ", " + this.editStaffForm2.value['firstName'];
    this.staff.firstName = this.editStaffForm2.value['firstName'];
    this.staff.lastName = this.editStaffForm2.value['lastName'];
    this.staff.tuAccount = this.editStaffForm2.value['tuAccount'];
    this.staff.Email = this.editStaffForm2.value['email'];
    this.staff.Phone = this.editStaffForm2.value['phone'];
    this.staff.wcActive = active;
    this.staff.wcInactive = inactive;
    this.staff.wcInterested = interested;
    this.staff.wcTeamTraining = this.editStaffForm2.value['wcTeamTraining'];
    this.staff.wcStandLeader = this.editStaffForm2.value['wcStandLeader'];
    this.staff.wcMoveStockOut = this.editStaffForm2.value['wcMoveStockOut'];
    this.staff.wcContainerBarLead = this.editStaffForm2.value['wcContainerBarLead'];
    this.staff.wcFinalStandPrep = this.editStaffForm2.value['wcFinalStandPrep'];
    this.staff.wcSales = this.editStaffForm2.value['wcSales'];
  }

  updateStaffCf() {
    var newStatus = this.editStaffForm3.value['active1'];
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
    this.staff.Name = this.editStaffForm3.value['lastName'] + ", " + this.editStaffForm3.value['firstName'];
    this.staff.firstName = this.editStaffForm3.value['firstName'];
    this.staff.lastName = this.editStaffForm3.value['lastName'];
    this.staff.tuAccount = this.editStaffForm3.value['tuAccount'];
    this.staff.Email = this.editStaffForm3.value['email'];
    this.staff.Phone = this.editStaffForm3.value['phone'];
    this.staff.cfActive = active;
    this.staff.cfInactive = inactive;
    this.staff.cfInterested = interested;
    this.staff.cfAlcoholTraining = this.editStaffForm3.value['cfAlcoholTraining'];
    this.staff.cfLeader = this.editStaffForm3.value['cfLeader'];
    this.staff.cfAssistantLeader = this.editStaffForm3.value['cfAssistantLeader'];
    this.staff.cfStaff = this.editStaffForm3.value['cfStaff'];
  }

  updateStaffAll() {
    var newStatus1 = this.editStaffForm99.value['active1'];
      var active1;
      var inactive1;
      var interested1;
      if(newStatus1 == "pncActive") {
        active1 = true;
        inactive1 = false;
        interested1 = false;
      }
      else if(newStatus1 == "pncInactive") {
        active1 = false;
        inactive1 = true;
        interested1 = false;
      }
      else if(newStatus1 == "pncInterested") {
        active1 = false;
        inactive1 = false;
        interested1 = true;
      }

      var newStatus2 = this.editStaffForm99.value['active2'];
      var active2;
      var inactive2;
      var interested2;
      if(newStatus2 == "wcActive") {
        active2 = true;
        inactive2 = false;
        interested2 = false;
      }
      else if(newStatus2 == "wcInactive") {
        active2 = false;
        inactive2 = true;
        interested2 = false;
      }
      else if(newStatus2 == "wcInterested") {
        active2 = false;
        inactive2 = false;
        interested2 = true;
      }

      var newStatus3 = this.editStaffForm99.value['active3'];
      var active3;
      var inactive3;
      var interested3;
      if(newStatus3 == "cfActive") {
        active3 = true;
        inactive3 = false;
        interested3 = false;
      }
      else if(newStatus3 == "cfInactive") {
        active3 = false;
        inactive3 = true;
        interested3 = false;
      }
      else if(newStatus3 == "cfInterested") {
        active3 = false;
        inactive3 = false;
        interested3 = true;
      }

    this.staff.Name = this.editStaffForm99.value['lastName'] + ", " + this.editStaffForm99.value['firstName'];
    this.staff.firstName = this.editStaffForm99.value['firstName'];
    this.staff.lastName = this.editStaffForm99.value['lastName'];
    this.staff.tuAccount = this.editStaffForm99.value['tuAccount'];
    this.staff.Email = this.editStaffForm99.value['email'];
    this.staff.Phone = this.editStaffForm99.value['phone'];

    this.staff.pncActive = active1;
    this.staff.pncInactive = inactive1;
    this.staff.pncInterested = interested1;
    this.staff.pncHealthForm = this.editStaffForm99.value['pncHealthForm'];
    this.staff.pncExperienced = this.editStaffForm99.value['pncExperienced'];
    this.staff.pncBars = this.editStaffForm99.value['pncBars'];
    this.staff.pncBarsRefresher = this.editStaffForm99.value['pncBarsRefresher'];
    this.staff.pncWaiver = this.editStaffForm99.value['pncWaiver'];
    this.staff.pncStandLeader = this.editStaffForm1.value['pncStandLeader'];
    this.staff.pncGroupLeader = this.editStaffForm1.value['pncGroupLeader'];
    this.staff.pncHeadCook = this.editStaffForm1.value['pncHeadCook'];
    this.staff.pncRegister = this.editStaffForm1.value['pncRegister'];
    this.staff.pncAssistantCook = this.editStaffForm1.value['pncAssistantCook'];
    this.staff.pncBeerCart = this.editStaffForm1.value['pncBeerCart'];

    this.staff.wcActive = active2;
    this.staff.wcInactive = inactive2;
    this.staff.wcInterested = interested2;
    this.staff.wcTeamTraining = this.editStaffForm99.value['wcTeamTraining'];
    this.staff.wcStandLeader = this.editStaffForm2.value['wcStandLeader'];
    this.staff.wcMoveStockOut = this.editStaffForm2.value['wcMoveStockOut'];
    this.staff.wcContainerBarLead = this.editStaffForm2.value['wcContainerBarLead'];
    this.staff.wcFinalStandPrep = this.editStaffForm2.value['wcFinalStandPrep'];
    this.staff.wcSales = this.editStaffForm2.value['wcSales'];

    this.staff.cfActive = active3;
    this.staff.cfInactive = inactive3;
    this.staff.cfInterested = interested3;
    this.staff.cfAlcoholTraining = this.editStaffForm99.value['cfAlcoholTraining'];
    this.staff.cfLeader = this.editStaffForm3.value['cfLeader'];
    this.staff.cfAssistantLeader = this.editStaffForm3.value['cfAssistantLeader'];
    this.staff.cfStaff = this.editStaffForm3.value['cfStaff'];
  }

  onRemoveStaff() {
    this.removeStaffConfirm = true;
  }

  onRemoveNo() {
    this.removeStaffConfirm = false;
  }

  onRemoveYes() {
    this.staffService.removeStaffInDB(this.staff).subscribe(res => {
      this.staffService.getAllStaff().subscribe(staff => {
        var formattedStaff: Staff[] = this.staffService.formatAllStaffResults(staff);
        this.staffService.setAllStaff(formattedStaff);
        this.onCancel();
      });
    });
  }

  onAccountChange() {

  }
}
