import { StaffEditComponent } from './../staff-edit/staff-edit.component';
import { ToastrService } from 'ngx-toastr';
import { CreditSummaryService } from './../../../createReports/credit-summary.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StaffService } from './../../staff.service';
import { Staff } from './../../../models/staff.model';
import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CreditSummaryComponent } from '../credit-summary/credit-summary.component';


@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {
  @Input() setStaff: Staff[];
  @Input() currentVenueID: number;
  @Input() showVenue: number;

  modalOptions:NgbModalOptions;
  closeResult: string;
  staffMember: Staff;
  staffEdit: Boolean;
  creditSummaryMsg: Boolean = false;
  
  summaryForm2: FormGroup;
  summaryForm3: FormGroup;
  summaryForm4: FormGroup;

  constructor(private staffService: StaffService, 
              private creditSummaryService: CreditSummaryService,
              private toastr: ToastrService,
              private modalServices: NgbModal) {
                this.modalOptions = {
                  backdrop:'static',
                  backdropClass:'customBackdrop',
                  size: 'xl'
               } 
              }

  ngOnInit() {
    this.staffMember = this.setStaff[0];
    this.staffEdit = this.staffService.getstaffEdit();
   }



  getDate(date) {
    if(date == null) {
      return "---";
    }
    else {
      var newDate: Date = new Date(date);
  
      if(newDate.getDate()) {
        var convertDate = (newDate.getMonth() + 1) + '-' + newDate.getDate() + '-' + newDate.getFullYear();
        return convertDate;
      } 
      else {
        return date;
      }
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

  onEditStaff() {
    this.staffEdit = true;
  }

  onChangeStatus() {
    
  }

  openEditMember() {
    const modalRef = this.modalServices.open(StaffEditComponent);
    modalRef.componentInstance.staff = this.staffMember;
    modalRef.componentInstance.currentVenueID = this.currentVenueID;
    modalRef.componentInstance.showVenue = this.showVenue;
  }

  openCreditSummary() {
    const modalRef = this.modalServices.open(CreditSummaryComponent);
    modalRef.componentInstance.staffMember = this.staffMember;
  }

}
