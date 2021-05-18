import { Timesheet } from './../../../models/timesheet.model';
import { Event } from './../../../models/event.model';
import { MathService } from './../../math.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './../../event.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Season } from 'src/app/models/season.model';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  @Input() event: Event;
  @Input() currentVenueID: number;
  @Input() currentSeasonID: number;

  modalOptions: NgbModalOptions;
  public dateValue: Date;
  editEventForm: FormGroup;
  editEventForm2020: FormGroup;
  idVenue: number;
  currentSeason: Season;

  constructor(private eventService: EventService,
              private mathService: MathService,
              private route: ActivatedRoute,
              private router: Router,
              public activeModal: NgbActiveModal) {
                this.modalOptions = {
                  backdrop:'static',
                  backdropClass:'customBackdrop',
                  size: 'xl',
                  centered: true
               } 
              }

  ngOnInit() {
    this.eventService.getSeasons().subscribe(res => {
      this.eventService.setSeasons(res);
      this.eventService.setCurrentSeasonById(this.currentSeasonID);
      this.currentSeason = this.eventService.getCurrentSeason();
    });
    this.idVenue = this.event.venueID;
    this.initForm();
    this.initForm2020();
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
    let coordinatorAdminAmt = this.checkForNullNum(this.event.coordinatorAdminAmt);
    let closed = this.event.closed;
    let bonus = this.checkForNullNum(this.event.venueBonus);
    let checkRcvd = this.checkForNullNum(this.event.actualCheck);
    let notes = this.event.eventNotes;

    let totalSalesPnc = this.checkForNullNum(this.event.totalSalesPnc);
    let commBonus = this.event.metCommissionBonus;
    let guarantee = this.event.guarantee;
    let countTotal = this.event.eventCountsTowardsTotal;
    let alcSales = this.checkForNullNum(this.event.alcSales);

    let estCheck = this.checkForNullNum(this.event.estimatedCheck);
    let creditCardTips = this.checkForNullNum(this.event.creditCardTips);

    let totalSalesCf = this.checkForNullNum(this.event.totalSalesCf);
    
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
      'totalSalesCf': new FormControl(totalSalesCf, Validators.required)
    });
  }

  private initForm2020() {
    let eventTitle = this.event.Title;
    let dateTime = this.event.Date;
    if(!dateTime) {
      this.dateValue = this.getToday();
    }
    else {
      this.dateValue = new Date(dateTime);
    }
    let inputLocation = this.event.location;
    let coordinatorAdminAmt = this.checkForNullNum(this.event.coordinatorAdminAmt);
    let closed = this.event.closed;
    let bonus = this.checkForNullNum(this.event.venueBonus);
    let checkRcvd = this.checkForNullNum(this.event.actualCheck);
    let notes = this.event.eventNotes;

    let totalSalesPnc = this.checkForNullNum(this.event.totalSalesPnc);
    let commBonus = this.event.metCommissionBonus;
    let guarantee = this.event.guarantee;
    let countTotal = this.event.eventCountsTowardsTotal;
    let alcSales = this.checkForNullNum(this.event.alcSales);
    let itemSales1 = this.checkForNullNum(this.event.itemSales1);
    let alcSales1 = this.checkForNullNum(this.event.alcSales1);
    let discounts1 = this.checkForNullNum(this.event.discounts1);
    let itemSales2 = this.checkForNullNum(this.event.itemSales2);
    let alcSales2 = this.checkForNullNum(this.event.alcSales2);
    let discounts2 = this.checkForNullNum(this.event.discounts2);
    let itemSales3 = this.checkForNullNum(this.event.itemSales3);
    let alcSales3 = this.checkForNullNum(this.event.alcSales3);
    let discounts3 = this.checkForNullNum(this.event.discounts3);
    let itemSales4 = this.checkForNullNum(this.event.itemSales4);
    let alcSales4 = this.checkForNullNum(this.event.alcSales4);
    let discounts4 = this.checkForNullNum(this.event.discounts4);
    let itemSales5 = this.checkForNullNum(this.event.itemSales5);
    let alcSales5 = this.checkForNullNum(this.event.alcSales5);
    let discounts5 = this.checkForNullNum(this.event.discounts5);
    let itemSales6 = this.checkForNullNum(this.event.itemSales6);
    let alcSales6 = this.checkForNullNum(this.event.alcSales6);
    let discounts6 = this.checkForNullNum(this.event.discounts6);
    let ccTips = this.checkForNullNum(this.event.ccTips);

    let estCheck = this.checkForNullNum(this.event.estimatedCheck);
    let creditCardTips = this.checkForNullNum(this.event.creditCardTips);

    let totalSalesCf = this.checkForNullNum(this.event.totalSalesCf);
    
    this.editEventForm2020 = new FormGroup({
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
      'discounts6' : new FormControl(discounts6, Validators.required),
      'ccTips' : new FormControl(ccTips, Validators.required)
    });
  }

  checkForNullNum(num) {
    num = parseFloat(num);
    if(num == null || isNaN(num))
      return num;
    else  {
      return num.toFixed(2);
    }
  }

  onCancelEdit() {
    this.eventService.setEventEdit(false);
    this.router.navigate([], {relativeTo: this.route});
  }

  onSubmit() {
    this.updateEvent();
    if(this.idVenue == 1 && this.currentSeasonID <= 3) {
      this.eventService.getPncContractInfo().subscribe(contract => {
        this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
          this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
          this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
            this.eventService.getAllEvents().subscribe(events => {
              this.eventService.setAllEvents(events);
              this.activeModal.dismiss("Edit submitted");
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
              var timesheets: Timesheet[] = this.mathService.timesheets;
              if(timesheets.length > 0) {
                this.eventService.updateAllTimesheetsInDB(timesheets).subscribe(x => {  
                  this.activeModal.dismiss("Edit submitted");
                })
              }
              else {
                this.activeModal.dismiss("Edit submitted");
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
              this.activeModal.dismiss("Edit submitted");
            });
          });
        });
      });
    }
  }

  onSubmit2020() {
    this.updateEvent2020();
    if(this.idVenue == 1 && this.currentSeasonID >= 4) {
      this.eventService.getPncContractInfo().subscribe(contract => {
        this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
          this.event = this.mathService.calculatePncEvent2020(this.event, contract[0], timesheets);
          this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
            this.eventService.getAllEvents().subscribe(events => {
              this.eventService.setAllEvents(events);
              this.activeModal.dismiss("Edit submitted");
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
      this.event.estimatedCheck = parseFloat(this.editEventForm.value['estCheck']);
    }
    
    else if(this.idVenue == 3) {
      this.event.totalSalesCf = this.editEventForm.value['totalSalesCf'];
    }
  }

  updateEvent2020() {
    this.event.Title = this.editEventForm2020.value['eventTitle'];
    this.event.Date = this.editEventForm2020.value['dateTime'];
    this.event.location = this.editEventForm2020.value['inputLocation'];
    this.event.coordinatorAdminAmt = parseFloat(this.editEventForm2020.value['coordinatorAdminAmt']);
    this.event.venueBonus = parseFloat(this.editEventForm2020.value['bonus']);
    this.event.actualCheck = parseFloat(this.editEventForm2020.value['checkRcvd']);
    this.event.eventNotes = this.editEventForm2020.value['notes'];
    this.event.closed = this.editEventForm2020.value['closed'];

    if(this.idVenue == 1) {
      this.event.metCommissionBonus = this.editEventForm2020.value['commBonus'];
      this.event.guarantee = this.editEventForm2020.value['guarantee'];
      this.event.eventCountsTowardsTotal = this.editEventForm2020.value['countTotal'];
      this.event.itemSales1 = parseFloat(this.editEventForm2020.value['itemSales1']);
      this.event.alcSales1 = parseFloat(this.editEventForm2020.value['alcSales1']);
      this.event.discounts1 = parseFloat(this.editEventForm2020.value['discounts1']);
      this.event.itemSales2 = parseFloat(this.editEventForm2020.value['itemSales2']);
      this.event.alcSales2 = parseFloat(this.editEventForm2020.value['alcSales2']);
      this.event.discounts2 = parseFloat(this.editEventForm2020.value['discounts2']);
      this.event.itemSales3 = parseFloat(this.editEventForm2020.value['itemSales3']);
      this.event.alcSales3 = parseFloat(this.editEventForm2020.value['alcSales3']);
      this.event.discounts3 = parseFloat(this.editEventForm2020.value['discounts3']);
      this.event.itemSales4 = parseFloat(this.editEventForm2020.value['itemSales4']);
      this.event.alcSales4 = parseFloat(this.editEventForm2020.value['alcSales4']);
      this.event.discounts4 = parseFloat(this.editEventForm2020.value['discounts4']);
      this.event.itemSales5 = parseFloat(this.editEventForm2020.value['itemSales5']);
      this.event.alcSales5 = parseFloat(this.editEventForm2020.value['alcSales5']);
      this.event.discounts5 = parseFloat(this.editEventForm2020.value['discounts5']);
      this.event.itemSales6 = parseFloat(this.editEventForm2020.value['itemSales6']);
      this.event.alcSales6 = parseFloat(this.editEventForm2020.value['alcSales6']);
      this.event.discounts6 = parseFloat(this.editEventForm2020.value['discounts6']);
      this.event.ccTips = parseFloat(this.editEventForm2020.value['ccTips']);
    }
  }
}


