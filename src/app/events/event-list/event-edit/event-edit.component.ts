import { Timesheet } from './../../../models/timesheet.model';
import { Event } from './../../../models/event.model';
import { MathService } from './../../math.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './../../event.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  @Input() event: Event;
  @Input() currentVenueID: number;

  public dateValue: Date;
  editEventForm: FormGroup;
  idVenue: number;

  constructor(private eventService: EventService,
              private mathService: MathService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.idVenue = this.event.venueID;
    this.initForm();
  }

  // set the starting day/time to today's date at 6:00 PM
  getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todayDate = new Date(mm + '/' + dd + '/' + yyyy); 
    todayDate.setHours(18);
    todayDate.setMinutes(0);
    return todayDate;
  }
 
  private initForm() {
    let eventTitle = this.event.Title;
    let dateTime = this.event.Date;
    if(!dateTime) {
      this.dateValue = this.getToday();
    }
    else {
      this.dateValue = new Date(dateTime);
    }
    let inputLocation = this.event.location;
    let coordinatorAdminAmt = this.event.coordinatorAdminAmt;
    let closed = this.event.closed;
    let bonus = this.event.venueBonus;
    let checkRcvd = this.event.actualCheck;
    let notes = this.event.eventNotes;

    let totalSalesPnc = this.event.totalSalesPnc;
    let commBonus = this.event.metCommissionBonus;
    let guarantee = this.event.guarantee;
    let countTotal = this.event.eventCountsTowardsTotal;
    let alcSales = this.event.alcSales;

    let estCheck = this.event.estimatedCheck;
    let creditCardTips = this.event.creditCardTips;
    let shuttleBonusBoolWc = this.event.shuttleBonusBoolWc;
    let shuttleBonusAmountWc = this.event.shuttleBonusAmountWc;
    if(!shuttleBonusAmountWc) { shuttleBonusAmountWc = 0 };

    let totalSalesCf = this.event.totalSalesCf;
    let shuttleBonusBoolCf = this.event.shuttleBonusBoolCf;
    let shuttleBonusAmountCf = this.event.shuttleBonusAmountCf;
    
    this.editEventForm = new FormGroup({
      'eventTitle': new FormControl(eventTitle, Validators.required),
      'dateTime': new FormControl(dateTime, Validators.required),
      'coordinatorAdminAmt': new FormControl(coordinatorAdminAmt, Validators.required),
      'inputLocation': new FormControl(inputLocation, Validators.required),
      'commBonus': new FormControl(commBonus, Validators.required),
      'guarantee': new FormControl(guarantee, Validators.required),
      'countTotal': new FormControl(countTotal, Validators.required),
      'closed': new FormControl(closed, Validators.required),
      'totalSalesPnc': new FormControl(totalSalesPnc, Validators.required),
      'alcSales': new FormControl(alcSales, Validators.required),
      'bonus': new FormControl(bonus, Validators.required),
      'estCheck': new FormControl(estCheck, Validators.required),
      'checkRcvd': new FormControl(checkRcvd, Validators.required),
      'notes': new FormControl(notes, Validators.required),
      'creditCardTips': new FormControl(creditCardTips, Validators.required),
      'shuttleBonusBoolWc': new FormControl(shuttleBonusBoolWc, Validators.required),
      'shuttleBonusAmountWc': new FormControl(shuttleBonusAmountWc, Validators.required),
      'totalSalesCf': new FormControl(totalSalesCf, Validators.required),
      'shuttleBonusBoolCf': new FormControl(shuttleBonusBoolCf, Validators.required),
      'shuttleBonusAmountCf': new FormControl(shuttleBonusAmountCf, Validators.required)
    });
  }

  onCancelEdit() {
    this.eventService.setEventEdit(false);
    this.router.navigate([], {relativeTo: this.route});
  }

  onSubmit() {
    this.updateEvent();
// TODO: why won't event update save on first attempt?

    if(this.idVenue == 1) {
      this.eventService.getPncContractInfo().subscribe(contract => {
        this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
          this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
          this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
            this.eventService.getAllEvents().subscribe(events => {
              this.eventService.setAllEvents(events);
              this.onCancelEdit();
            });
          });
        });
      });
    }
    else if(this.idVenue == 2) {
      this.eventService.getWcContractInfo().subscribe(contract => {
        this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
          if(!timesheets) {timesheets = [];}
          this.event = this.mathService.calculateWcEvent(this.event, contract[0], timesheets);
          this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
            this.eventService.getAllEvents().subscribe(events => {
              this.eventService.setAllEvents(events);
              var timesheets: Timesheet[] = this.eventService.returnTimesheets();
              if(timesheets.length > 0) {
                this.eventService.updateAllTimesheetsInDB(timesheets).subscribe(x => {
                  this.onCancelEdit();
                })
              }
              else {
                this.onCancelEdit();
              }
            });
          });
        });
      });
    }
    else if(this.idVenue == 3) {
      this.eventService.getCfContractInfo().subscribe(contract => {
        this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
          this.event = this.mathService.calculateCfEvent(this.event, contract[0], timesheets);
          this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
            this.eventService.getAllEvents().subscribe(events => {
              this.eventService.setAllEvents(events);
              this.onCancelEdit();
            });
          });
        });
      });
    }
  }

  updateEvent() {
    this.event.Title = this.editEventForm.value['eventTitle'];
    this.event.Date = this.editEventForm.value['dateTime'];
    this.event.location = this.editEventForm.value['inputLocation'];
    this.event.coordinatorAdminAmt = parseFloat(this.editEventForm.value['coordinatorAdminAmt']);
    this.event.venueBonus = parseFloat(this.editEventForm.value['bonus']);
    this.event.actualCheck = parseFloat(this.editEventForm.value['checkRcvd']);
    this.event.eventNotes = this.editEventForm.value['notes'];
    this.event.closed = this.editEventForm.value['closed'];

    if(this.idVenue == 1) {
      this.event.metCommissionBonus = this.editEventForm.value['commBonus'];
      this.event.guarantee = this.editEventForm.value['guarantee'];
      this.event.totalSalesPnc = parseFloat(this.editEventForm.value['totalSalesPnc']);
      this.event.alcSales = parseFloat(this.editEventForm.value['alcSales']);
      this.event.eventCountsTowardsTotal = this.editEventForm.value['countTotal'];
    }

    else if(this.idVenue == 2) {
      this.event.creditCardTips = parseFloat(this.editEventForm.value['creditCardTips']);
      var shuttleBool = this.editEventForm.value['shuttleBonusBoolWc'];
      if(shuttleBool) {
        this.event.shuttleBonusBoolWc = true;
      }
      else{
        this.event.shuttleBonusBoolWc = false;
      }
      this.event.shuttleBonusAmountWc = parseFloat(this.editEventForm.value['shuttleBonusAmountWc']);
      this.event.estimatedCheck = parseFloat(this.editEventForm.value['estCheck']);
    }
    
    else if(this.idVenue == 3) {
      this.event.totalSalesCf = this.editEventForm.value['totalSalesCf'];
      this.event.shuttleBonusBoolCf = this.editEventForm.value['shuttleBonusBoolCf'];
      this.event.shuttleBonusAmountCf = parseFloat(this.editEventForm.value['shuttleBonusAmountCf']);
    }
  }
}
