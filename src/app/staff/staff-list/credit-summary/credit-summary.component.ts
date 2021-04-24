import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CreditSummaryService } from 'src/app/createReports/credit-summary.service';
import { Staff } from 'src/app/models/staff.model';

@Component({
  selector: 'app-credit-summary',
  templateUrl: './credit-summary.component.html',
  styleUrls: ['./credit-summary.component.css']
})
export class CreditSummaryComponent implements OnInit {
  @Input() staffMember: Staff;

  dateValue: Date;
  summaryForm: FormGroup;
  modalOptions: NgbModalOptions;

  constructor(private creditSummaryService: CreditSummaryService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      size: 'xl',
      centered: false
   } 
  }

  ngOnInit() {
    this.dateValue = this.getToday();
    this.initForm();
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

  onCreateCreditSummary() {
    var start = new Date(this.summaryForm.value['startDate'])
    var end = new Date(this.summaryForm.value['endDate']);

    var summarySpecs = {
      staffID: this.staffMember.idperson,
      staffName: this.staffMember.lastName + ", " + this.staffMember.firstName,
      start: start,
      end: end,
      email1: this.summaryForm.value['emailSummary1'],
      email2: this.summaryForm.value['emailSummary2'],
      download: this.summaryForm.value['downloadSummary']
    };

    if(!summarySpecs.email1 && !summarySpecs.email2 && !summarySpecs.download) {
      this.activeModal.close(null);
    }

    else{
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
        this.activeModal.close("sent credit summary");
      });
    }
  }

}
