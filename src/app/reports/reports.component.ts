import { ToastrService } from 'ngx-toastr';
import { AdminReportService } from './../createReports/admin-report.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  eventReportMsg = false;
  eventReportForm : FormGroup;
  dateValue: Date;
  showSummaryMsg: Boolean = false;

  constructor(private adminReportService : AdminReportService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.dateValue = this.getToday();
    this.initEventForm();
  }

  getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todayDate = new Date(mm + '/' + dd + '/' + yyyy); 
    return todayDate;
  }

  initEventForm() {
    let startDate = this.dateValue;
    let endDate = this.dateValue;
    let pnc = true;
    let wc = true;
    let cf = true;
    let eventDate = true;
    let eventName = true;
    let eventLocation = false;
    let eventPayout = true;
    let eventCheck = true;
    let eventBonus = false;
    let eventDiscrepancy = false;
    let eventProfit = false;
    let emailSummary = false;
    let downloadSummary = false;

    this.eventReportForm = new FormGroup({
      'startDate': new FormControl(startDate, Validators.required),
      'endDate': new FormControl(endDate, Validators.required),
      'pnc': new FormControl(pnc, Validators.required),
      'wc': new FormControl(wc, Validators.required),
      'cf': new FormControl(cf, Validators.required),
      'eventDate': new FormControl(eventDate, Validators.required),
      'eventName': new FormControl(eventName, Validators.required),
      'eventLocation': new FormControl(eventLocation, Validators.required),
      'eventPayout': new FormControl(eventPayout, Validators.required),
      'eventCheck': new FormControl(eventCheck, Validators.required),
      'eventBonus': new FormControl(eventBonus, Validators.required),
      'eventDiscrepancy': new FormControl(eventDiscrepancy, Validators.required),
      'eventProfit': new FormControl(eventProfit, Validators.required),
      'emailSummary': new FormControl(emailSummary, Validators.required),
      'downloadSummary': new FormControl(downloadSummary, Validators.required)
    });
  }

  onEventReport() {
    this.eventReportMsg = true;
  }

  onCancelEventReport() {
    this.eventReportMsg = false;
  }

  onCreateEventReport() {
    var start = new Date(this.eventReportForm.value['startDate'])
    var end = new Date(this.eventReportForm.value['endDate']);

    var summarySpecs = {
      start: start,
      end: end,
      pnc: this.eventReportForm.value['pnc'],
      wc: this.eventReportForm.value['wc'],
      cf: this.eventReportForm.value['cf'],
      eventDate: this.eventReportForm.value['eventDate'],
      eventName: this.eventReportForm.value['eventName'],
      eventLocation: this.eventReportForm.value['eventLocation'],
      eventPayout: this.eventReportForm.value['eventPayout'],
      eventCheck: this.eventReportForm.value['eventCheck'],
      eventBonus: this.eventReportForm.value['eventBonus'],
      eventDiscrepancy: this.eventReportForm.value['eventDiscrepancy'],
      eventProfit: this.eventReportForm.value['eventProfit'],
      emailSummary: this.eventReportForm.value['emailSummary'],
      downloadSummary: this.eventReportForm.value['downloadSummary']
    }

    if(!summarySpecs.emailSummary && !summarySpecs.downloadSummary) {
      this.showSummaryMsg = true;
    }

    else {
      this.showSummaryMsg = false;
      this.adminReportService.generateAdminReport1(summarySpecs).subscribe(res => {
        if(summarySpecs.emailSummary) {
          this.toastr.success("Report was emailed.", "SUCCESS!", {
            closeButton: true,
            timeOut: 3000
          });
        }
        if(summarySpecs.downloadSummary) {
          window.open(window.URL.createObjectURL(res));
        }
        this.onCancelEventReport();
      });
    }
  }
}
