import { ToastrService } from 'ngx-toastr';
import { CreditSummaryService } from './../../../createReports/credit-summary.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StaffService } from './../../staff.service';
import { Staff } from './../../../models/staff.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {
  @Input() staff: Staff;
  @Input() currentVenueID: number;
  @Input() showVenue: number;

  staffEdit: Boolean;
  creditSummaryMsg: Boolean = false;
  dateValue: Date;
  summaryForm: FormGroup;
  summaryForm2: FormGroup;
  summaryForm3: FormGroup;
  summaryForm4: FormGroup;
  showCreateReportMsg: boolean = false;

  constructor(private staffService: StaffService, 
              private creditSummaryService: CreditSummaryService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.dateValue = this.getToday();
    this.initForm();
    this.initForm2();
    this.initForm3();
    this.initForm4();

    this.staffEdit = this.staffService.getstaffEdit();
    this.staffService.staffEditChanged.subscribe(editChanged => {
      this.staffEdit = editChanged;
    });
   }

   getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todayDate = new Date(mm + '/' + dd + '/' + yyyy); 
    return todayDate;
  }

  initForm() {
    let startDate = this.dateValue;
    let endDate = this.dateValue;
    let emailSummary1 = false;
    let emailSummary2 = false;
    let downloadSummary = false;

    this.summaryForm = new FormGroup({
      'startDate': new FormControl(startDate, Validators.required),
      'endDate': new FormControl(endDate, Validators.required),
      'emailSummary1': new FormControl(emailSummary1, Validators.required),
      'emailSummary2': new FormControl(emailSummary2, Validators.required),
      'downloadSummary': new FormControl(downloadSummary, Validators.required)
    });
  }

  initForm2() {
    let startDate = this.dateValue;
    let endDate = this.dateValue;
    let emailSummary1 = false;
    let emailSummary2 = false;
    let downloadSummary = false;

    this.summaryForm2 = new FormGroup({
      'startDate': new FormControl(startDate, Validators.required),
      'endDate': new FormControl(endDate, Validators.required),
      'emailSummary1': new FormControl(emailSummary1, Validators.required),
      'emailSummary2': new FormControl(emailSummary2, Validators.required),
      'downloadSummary': new FormControl(downloadSummary, Validators.required)
    });
  }

  initForm3() {
    let startDate = this.dateValue;
    let endDate = this.dateValue;
    let emailSummary1 = false;
    let emailSummary2 = false;
    let downloadSummary = false;

    this.summaryForm3 = new FormGroup({
      'startDate': new FormControl(startDate, Validators.required),
      'endDate': new FormControl(endDate, Validators.required),
      'emailSummary1': new FormControl(emailSummary1, Validators.required),
      'emailSummary2': new FormControl(emailSummary2, Validators.required),
      'downloadSummary': new FormControl(downloadSummary, Validators.required)
    });
  }

  initForm4() {
    let startDate = this.dateValue;
    let endDate = this.dateValue;
    let emailSummary1 = false;
    let emailSummary2 = false;
    let downloadSummary = false;

    this.summaryForm4 = new FormGroup({
      'startDate': new FormControl(startDate, Validators.required),
      'endDate': new FormControl(endDate, Validators.required),
      'emailSummary1': new FormControl(emailSummary1, Validators.required),
      'emailSummary2': new FormControl(emailSummary2, Validators.required),
      'downloadSummary': new FormControl(downloadSummary, Validators.required)
    });
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

  onCreditSummary() {
    this.creditSummaryMsg = true;
  }

  onCancelCreditSummary() {
    this.creditSummaryMsg = false;
  }

  onCreateCreditSummary() {
    if(this.currentVenueID == 1) {
      var start = new Date(this.summaryForm.value['startDate'])
      var end = new Date(this.summaryForm.value['endDate']);
  
      var summarySpecs = {
        staffID: this.staff.idperson,
        staffName: this.staff.lastName + ", " + this.staff.firstName,
        start: start,
        end: end,
        email1: this.summaryForm.value['emailSummary1'],
        email2: this.summaryForm.value['emailSummary2'],
        download: this.summaryForm.value['downloadSummary']
      };
  
      if(!summarySpecs.email1 && !summarySpecs.email2 && !summarySpecs.download) {
        this.showCreateReportMsg = true;
      }
  
      else{
        this.showCreateReportMsg = false;
        this.creditSummaryService.generateCreditSummary(summarySpecs).subscribe(res => {
          if(summarySpecs.email1 || summarySpecs.email2) {
            this.toastr.success("Credit Summary was emailed.", "SUCCESS!", {
              closeButton: true,
              timeOut: 3000
            });
          }
          if(summarySpecs.download) {
            window.open(window.URL.createObjectURL(res));
          }
          this.onCancelCreditSummary();
        });
      }
    }

    else if(this.currentVenueID == 2) {
      var start2 = new Date(this.summaryForm2.value['startDate'])
      var end2 = new Date(this.summaryForm2.value['endDate']);
  
      var summarySpecs2 = {
        staffID: this.staff.idperson,
        staffName: this.staff.lastName + ", " + this.staff.firstName,
        start: start2,
        end: end2,
        email1: this.summaryForm2.value['emailSummary1'],
        email2: this.summaryForm2.value['emailSummary2'],
        download: this.summaryForm2.value['downloadSummary']
      };
  
      if(!summarySpecs2.email1 && !summarySpecs2.email2 && !summarySpecs2.download) {
        this.showCreateReportMsg = true;
      }
  
      else {
        this.showCreateReportMsg = false;
        this.creditSummaryService.generateCreditSummary(summarySpecs2).subscribe(res => {
          if(summarySpecs2.email1 || summarySpecs2.email2) {
            this.toastr.success("Credit Summary was emailed.", "SUCCESS!", {
              closeButton: true,
              timeOut: 3000
            });
          }
          if(summarySpecs2.download) {
            window.open(window.URL.createObjectURL(res));
          }
          this.onCancelCreditSummary();
        });
      }

    }

    else if(this.currentVenueID == 3) {
      var start3 = new Date(this.summaryForm3.value['startDate'])
      var end3 = new Date(this.summaryForm3.value['endDate']);
  
      var summarySpecs3 = {
        staffID: this.staff.idperson,
        staffName: this.staff.lastName + ", " + this.staff.firstName,
        start: start3,
        end: end3,
        email1: this.summaryForm3.value['emailSummary1'],
        email2: this.summaryForm3.value['emailSummary2'],
        download: this.summaryForm3.value['downloadSummary']
      };
  
      if(!summarySpecs3.email1 && !summarySpecs3.email2 && !summarySpecs3.download) {
        this.showCreateReportMsg = true;
      }

      else {
        this.showCreateReportMsg = false;
        this.creditSummaryService.generateCreditSummary(summarySpecs3).subscribe(res => {
          if(summarySpecs3.email1 || summarySpecs3.email2) {
            this.toastr.success("Credit Summary was emailed.", "SUCCESS!", {
              closeButton: true,
              timeOut: 3000
            });
          }
          if(summarySpecs3.download) {
            window.open(window.URL.createObjectURL(res));
          }
          this.onCancelCreditSummary();
        });
      }
    }

    else if(this.currentVenueID == 99) {
      var start4 = new Date(this.summaryForm4.value['startDate'])
      var end4 = new Date(this.summaryForm4.value['endDate']);
  
      var summarySpecs4 = {
        staffID: this.staff.idperson,
        staffName: this.staff.lastName + ", " + this.staff.firstName,
        start: start4,
        end: end4,
        email1: this.summaryForm4.value['emailSummary1'],
        email2: this.summaryForm4.value['emailSummary2'],
        download: this.summaryForm4.value['downloadSummary']
      };
  
      if(!summarySpecs3.email1 && !summarySpecs3.email2 && !summarySpecs3.download) {
        this.showCreateReportMsg = true;
      }
  
      else {
        this.showCreateReportMsg = false;
        this.creditSummaryService.generateCreditSummary(summarySpecs4).subscribe(res => {
          if(summarySpecs4.email1 || summarySpecs4.email2) {
            this.toastr.success("Credit Summary was emailed.", "SUCCESS!", {
              closeButton: true,
              timeOut: 3000
            });
          }
          if(summarySpecs4.download) {
            window.open(window.URL.createObjectURL(res));
          }
          this.onCancelCreditSummary();
        });
      }
    }
  }
}
