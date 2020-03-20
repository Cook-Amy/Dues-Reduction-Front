import { Event } from './../../../models/event.model';
import { Timesheet } from './../../../models/timesheet.model';
import { MathService } from './../../math.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './../../event.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.css']
})
export class EventNewComponent implements OnInit {
  @Input() currentVenueID: number;
  @Input() currentSeasonID: number;
  public dateValue: Date;
  newEventForm: FormGroup;
  venueForm: FormGroup;

  newEvent: Event;
  allEvents: Event[];
  idVenue: number;

  constructor(private eventService: EventService,
              private mathService: MathService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dateValue = this.getToday();
    if(this.currentVenueID == 1) {
      this.allEvents = this.eventService.returnEventsPnc();
      this.idVenue = 1;
      this.initForm();
    }

    if(this.currentVenueID == 2) {
      this.allEvents = this.eventService.returnEventsWc();
      this.idVenue = 2;
      this.initForm();
    }

    if(this.currentVenueID == 3) {
      this.allEvents = this.eventService.returnEventsCf();
      this.idVenue = 3;
      this.initForm();
    }

    if(this.currentVenueID == 99) {
      this.allEvents = this.eventService.returnEventsAll();
      this.initVenueForm();
      this.initForm();
    }
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
    let eventTitle:string = "";
    let dateTime = this.dateValue;
    let inputLocation:string = "";
    if(this.idVenue == 1){
      inputLocation = "S109";
    }
    if(this.idVenue == 3) {
      inputLocation = "Beer2";
    }
    let coordinatorAdminAmt:number = 30;
    let closed:boolean = false;
    let bonus:number = 0;
    let checkRcvd:number = 0;
    let notes:string = "";

    let totalSalesPnc:number = 0;
    let alcSales:number = 0;
    let commBonus:boolean = false;
    let guarantee:boolean = false; 
    let countTotal:boolean = false;

    let estCheck = 0;
    let creditCardTips = 0;
    let shuttleBonusBoolWc = false;
    let shuttleBonusAmountWc = 10;

    //  TODO: Get rid of Shuttle Bonus Bool - it is too confusing. have just shuttle bonus amount.

    let totalSalesCf:number = 0;
    let shuttleBonusBoolCf = true;
    let shuttleBonusAmountCf = 10;

    this.newEventForm = new FormGroup({
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

  initVenueForm() {
    let selectVenue:number = 0;

    this.venueForm = new FormGroup({
      'selectVenue': new FormControl(selectVenue, Validators.required)
    });
  }

  pickVenue() {
    this.idVenue = this.venueForm.value['selectVenue'];
    this.initForm();
  }

  onSubmit() {
    var event: Event = this.createNewEvent();

    if(this.idVenue == 1) {
      this.eventService.getPncContractInfo().subscribe(contract => {
        // new events have no timesheets yet; send an empty array
        var timesheets: Timesheet[] = [];
        this.newEvent = this.mathService.calculatePncEvent(event, contract[0], timesheets);
        this.eventService.setNewEvent(this.newEvent).subscribe(res => {
          this.allEvents.push(this.newEvent);
          this.eventService.setAllEvents(this.allEvents);
          this.allEvents = this.eventService.returnEventsPnc();
        });
      });
    }

    else if(this.idVenue == 2) {
      this.eventService.getWcContractInfo().subscribe(contract => {
        // new events have no timesheets yet; send an empty array
        var timesheets: Timesheet[] = [];
        this.newEvent = this.mathService.calculateWcEvent(event, contract[0], timesheets);
        this.eventService.setNewEvent(this.newEvent).subscribe(res => {
          this.allEvents.push(this.newEvent);
          this.eventService.setAllEvents(this.allEvents);
          this.allEvents = this.eventService.returnEventsWc();
          var timesheets: Timesheet[] = this.eventService.returnTimesheets();
          if(timesheets.length > 0) {
            this.eventService.updateAllTimesheetsInDB(timesheets).subscribe(x => {
            })
          }
        });
      });
    }

    else if(this.idVenue == 3) {
      this.eventService.getCfContractInfo().subscribe(contract => {
        // new events have no timesheets yet; send an empty array
        var timesheets: Timesheet[] = [];
        this.newEvent = this.mathService.calculateCfEvent(event, contract[0], timesheets);
        this.eventService.setNewEvent(this.newEvent).subscribe(res => {
          this.allEvents.push(this.newEvent);
          this.eventService.setAllEvents(this.allEvents);
          this.allEvents = this.eventService.returnEventsCf();
        });
      });
    }

    this.onCancel();
  }

  onCancel() {
    this.eventService.setEventNew(false);
    this.router.navigate([], {relativeTo: this.route});
  }

  createNewEvent() {
    var event: Event;

    if(this.idVenue == 1) {
      event = new Event (
        0,
        this.currentSeasonID,
        1,
        this.newEventForm.value['dateTime'],
        this.newEventForm.value['eventTitle'],
        true,
        this.newEventForm.value['inputLocation'],
        parseFloat(this.newEventForm.value['bonus']),
        0,
        0,
        parseFloat(this.newEventForm.value['checkRcvd']),
        0,
        0,
        0,
        0.2000,
        0,
        0,
        this.newEventForm.value['notes'],
        this.newEventForm.value['closed'],
        this.newEventForm.value['coordinatorAdminAmt'],
        parseFloat(this.newEventForm.value['totalSalesPnc']),
        this.newEventForm.value['commBonus'],
        this.newEventForm.value['guarantee'],
        parseFloat(this.newEventForm.value['alcSales']),
        this.newEventForm.value['countTotal'],
        0,
        0,
        false,
        0,
        0,
        false,
        0,
        null
      );
    }
    else if(this.idVenue == 2) {
      event = new Event (
        0,
        this.currentSeasonID,
        2, 
        this.newEventForm.value['dateTime'],
        this.newEventForm.value['eventTitle'],
        true,
        this.newEventForm.value['inputLocation'],
        parseFloat(this.newEventForm.value['bonus']),
        parseFloat(this.newEventForm.value['estCheck']),
        0,
        parseFloat(this.newEventForm.value['checkRcvd']),
        0,
        0,
        0,
        0.2000,
        0,
        0,
        this.newEventForm.value['notes'],
        this.newEventForm.value['closed'],
        parseFloat(this.newEventForm.value['coordinatorAdminAmt']),
        0,
        false,
        false,
        0,
        false,
        parseFloat(this.newEventForm.value['creditCardTips']),
        30,
        this.newEventForm.value['shuttleBonusBoolWc'],
        parseFloat(this.newEventForm.value['shuttleBonusAmountWc']),
        0,
        false,
        0,
        null
      );
    }
    else if(this.idVenue == 3) {
      event = new Event (
        0,
        this.currentSeasonID,
        3,
        this.newEventForm.value['dateTime'],
        this.newEventForm.value['eventTitle'],
        true,
        this.newEventForm.value['inputLocation'],
        parseFloat(this.newEventForm.value['bonus']),
        0,
        0,
        parseFloat(this.newEventForm.value['checkRcvd']),
        0,
        0,
        0,
        0.2000,
        0,
        0,
        this.newEventForm.value['notes'],
        this.newEventForm.value['closed'],
        parseFloat(this.newEventForm.value['coordinatorAdminAmt']),
        0,
        false,
        false,
        0,
        false,
        0,
        0,
        false,
        0,
        parseFloat(this.newEventForm.value['totalSalesCf']),
        this.newEventForm.value['shuttleBonusBoolCf'],
        parseFloat(this.newEventForm.value['shuttleBonusAmountCf']),
        '',
      );
    }
    return event;
  }

  
}
