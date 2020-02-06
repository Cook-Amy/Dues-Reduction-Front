import { StaffService } from './../../staff.service';
import { Staff } from './../../../models/staff.model';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('emailInput', {static: false}) emailInputRef: ElementRef;
  @ViewChild('phoneInput', {static: false}) phoneInputRef: ElementRef;
  @ViewChild('tuaccountInput', {static: false}) tuaccountInputRef: ElementRef;
  pncActive: boolean = true;
  pncExperienced: boolean = true;


  constructor(private staffService: StaffService) { }

  ngOnInit() {
  }

  onSaveStaff() {
    const staffName = this.nameInputRef.nativeElement.value;
    const staffEmail = this.emailInputRef.nativeElement.value;
    const staffPhone = this.phoneInputRef.nativeElement.value;
    const staffTuAccout = this.tuaccountInputRef.nativeElement.value;
    const staffPncActive = this.pncActive;
    const staffPncExperienced = this.pncExperienced;

    const newStaff = new Staff(staffName, staffEmail, staffPhone, staffTuAccout, staffPncActive, staffPncExperienced);
    this.staffService.addStaff(newStaff);
    
  }

}
