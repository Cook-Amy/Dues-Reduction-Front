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
  newEventForm2020: FormGroup;
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
      if(this.currentSeasonID <= 3)
        this.initForm();
      if(this.currentSeasonID >= 4)
        this.initForm2020();
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
      if(this.currentSeasonID <= 3)
        this.initForm();
      if(this.currentSeasonID >= 4)
        this.initForm2020();
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

    let totalSalesCf:number = 0;

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
      'totalSalesCf': new FormControl(totalSalesCf, Validators.required)
    });
  }

  private initForm2020() {
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
    let itemSales1:number = 0;
    let alcSales1:number = 0;
    let discounts1:number = 0;
    let itemSales2:number = 0;
    let alcSales2:number = 0;
    let discounts2:number = 0;
    let itemSales3:number = 0;
    let alcSales3:number = 0;
    let discounts3:number = 0;
    let itemSales4:number = 0;
    let alcSales4:number = 0;
    let discounts4:number = 0;
    let itemSales5:number = 0;
    let alcSales5:number = 0;
    let discounts5:number = 0;
    let itemSales6:number = 0;
    let alcSales6:number = 0;
    let discounts6:number = 0;

    let estCheck = 0;
    let creditCardTips = 0;

    let totalSalesCf:number = 0;

    this.newEventForm2020 = new FormGroup({
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
      'totalSalesCf': new FormControl(totalSalesCf, Validators.required),
      'itemSales1' : new FormControl(itemSales1, Validators.required),
      'alcSales1' : new FormControl(alcSales1, Validators.required),
      'discounts1' : new FormControl(discounts1, Validators.required),
      'itemSales2' : new FormControl(itemSales2, Validators.required),
      'alcSales2' : new FormControl(alcSales2, Validators.required),
      'discounts2' : new FormControl(discounts2, Validators.required),
      'itemSales3' : new FormControl(itemSales3, Validators.required),
      'alcSales3' : new FormControl(alcSales3, Validators.required),
      'discounts3' : new FormControl(discounts3, Validators.required),
      'itemSales4' : new FormControl(itemSales4, Validators.required),
      'alcSales4' : new FormControl(alcSales4, Validators.required),
      'discounts4' : new FormControl(discounts4, Validators.required),
      'itemSales5' : new FormControl(itemSales5, Validators.required),
      'alcSales5' : new FormControl(alcSales5, Validators.required),
      'discounts5' : new FormControl(discounts5, Validators.required),
      'itemSales6' : new FormControl(itemSales6, Validators.required),
      'alcSales6' : new FormControl(alcSales6, Validators.required),
      'discounts6' : new FormControl(discounts6, Validators.required)
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
        this.eventService.setNewEvent(this.newEvent).subscribe(id => {
          this.newEvent.idevent = id;
          this.allEvents.push(this.newEvent);
          this.eventService.setAllEvents(this.allEvents);
          this.allEvents = this.eventService.returnEventsPnc();
          this.redirectTo();
        });
      });
    }

    else if(this.idVenue == 2) {
      this.eventService.getWcContractInfo().subscribe(contract => {
        // new events have no timesheets yet; send an empty array
        var timesheets: Timesheet[] = [];
        this.newEvent = this.mathService.calculateWcEvent(event, contract[0], timesheets);
        this.eventService.setNewEvent(this.newEvent).subscribe(id => {
          this.newEvent.idevent = id;
          this.allEvents.push(this.newEvent);
          this.eventService.setAllEvents(this.allEvents);
          this.allEvents = this.eventService.returnEventsWc();
          var timesheets: Timesheet[] = this.eventService.returnTimesheets();
          if(timesheets.length > 0) {
            this.eventService.updateAllTimesheetsInDB(timesheets).subscribe(x => {
            });
          }
          this.redirectTo();
        });
      });
    }

    else if(this.idVenue == 3) {
      this.eventService.getCfContractInfo().subscribe(contract => {
        // new events have no timesheets yet; send an empty array
        var timesheets: Timesheet[] = [];
        this.newEvent = this.mathService.calculateCfEvent(event, contract[0], timesheets);
        this.eventService.setNewEvent(this.newEvent).subscribe(id => {
          this.newEvent.idevent = id;
          this.allEvents.push(this.newEvent);
          this.eventService.setAllEvents(this.allEvents);
          this.allEvents = this.eventService.returnEventsCf();
          this.redirectTo();
        });
      });
    }

    //this.onCancel();
  }

  onSubmit2020() {
    var event: Event = this.createNewEvent2020();

    if(this.idVenue == 1) {
      this.eventService.getPncContractInfo().subscribe(contract => {
        // new events have no timesheets yet; send an empty array
        var timesheets: Timesheet[] = [];
        this.newEvent = this.mathService.calculatePncEvent2020(event, contract[0], timesheets);
        this.eventService.setNewEvent(this.newEvent).subscribe(id => {
          this.newEvent.idevent = id;
          this.allEvents.push(this.newEvent);
          this.eventService.setAllEvents(this.allEvents);
          this.allEvents = this.eventService.returnEventsPnc();
          this.redirectTo();
        });
      });
    }
  }

  onCancel() {
    this.eventService.setEventNew(false);
    this.router.navigate([], {relativeTo: this.route});
  }

  redirectTo() {
    var route = this.router.url;
    console.log("route: " + route);
    var redir = '';
    if(route == '/pnc/events')
      redir = '/pnc';
    else if(route == '/wc/events')
      redir = '/wc';
    else if(route == '/cf/events')
      redir = '/cf';
    else if(route == '/admin/events')
      redir = '/admin';
    else
      redir = '/home';
    
    this.router.navigateByUrl(redir, {skipLocationChange: true}).then(()=>
    this.router.navigate([route]));
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
        0,
        this.newEventForm.value['countTotal'],
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
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
        0,
        false,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        parseFloat(this.newEventForm.value['creditCardTips']),
        30,
        0,
        0,
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
        0,
        false,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        parseFloat(this.newEventForm.value['totalSalesCf']),
        0,
        '',
      );
    }
    return event;
  }

  createNewEvent2020() {
    var event: Event;

    if(this.idVenue == 1) {
      event = new Event (
        0,
        this.currentSeasonID,
        1,
        this.newEventForm2020.value['dateTime'],
        this.newEventForm2020.value['eventTitle'],
        true,
        this.newEventForm2020.value['inputLocation'],
        parseFloat(this.newEventForm2020.value['bonus']),
        0,
        0,
        parseFloat(this.newEventForm2020.value['checkRcvd']),
        0,
        0,
        0,
        0.2000,
        0,
        0,
        this.newEventForm2020.value['notes'],
        this.newEventForm2020.value['closed'],
        parseFloat(this.newEventForm2020.value['coordinatorAdminAmt']),
        0,
        this.newEventForm2020.value['commBonus'],
        this.newEventForm2020.value['guarantee'],
        0,
        0,
        this.newEventForm2020.value['countTotal'],
        this.newEventForm2020.value['itemSales1'],
        this.newEventForm2020.value['alcSales1'],
        this.newEventForm2020.value['discounts1'],
        this.newEventForm2020.value['itemSales2'],
        this.newEventForm2020.value['alcSales2'],
        this.newEventForm2020.value['discounts2'],
        this.newEventForm2020.value['itemSales3'],
        this.newEventForm2020.value['alcSales3'],
        this.newEventForm2020.value['discounts3'],
        this.newEventForm2020.value['itemSales4'],
        this.newEventForm2020.value['alcSales4'],
        this.newEventForm2020.value['discounts4'],
        this.newEventForm2020.value['itemSales5'],
        this.newEventForm2020.value['alcSales5'],
        this.newEventForm2020.value['discounts5'],
        this.newEventForm2020.value['itemSales6'],
        this.newEventForm2020.value['alcSales6'],
        this.newEventForm2020.value['discounts6'],
        0,
        0,
        0,
        0,
        0,
        null
      );
    }
    return event;
  }
  
}
