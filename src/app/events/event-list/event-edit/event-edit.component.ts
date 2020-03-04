import { MathService } from './../../math.service';
import { Timesheet } from './../../../models/timesheet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './../../event.service';
import { EventPNC } from './../../../models/eventPNC.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  @Input() event: EventPNC;
  @Input() currentVenueID: number;
  public dateValue: Date;
  editEventForm: FormGroup;
  // allPncEvents: EventPNC[];

  constructor(private eventService: EventService,
              private mathService: MathService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
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
    let commBonus = this.event.metCommissionBonus;
    let guarantee = this.event.guarantee;
    let countTotal = this.event.eventCountsTowardsTotal;
    let closed = this.event.closed;
    let totalSales = this.event.totalSales;
    let alcSales = this.event.alcSales;
    let bonus = this.event.venueBonus;
    let checkRcvd = this.event.actualCheck;
    let notes = this.event.eventNotes;
    
    this.editEventForm = new FormGroup({
      'eventTitle': new FormControl(eventTitle, Validators.required),
      'dateTime': new FormControl(dateTime, Validators.required),
      'inputLocation': new FormControl(inputLocation, Validators.required),
      'coordinatorAdminAmt': new FormControl(coordinatorAdminAmt, Validators.required),
      'commBonus': new FormControl(commBonus, Validators.required),
      'guarantee': new FormControl(guarantee, Validators.required),
      'countTotal': new FormControl(countTotal, Validators.required),
      'closed': new FormControl(closed, Validators.required),
      'totalSales': new FormControl(totalSales, Validators.required),
      'alcSales': new FormControl(alcSales, Validators.required),
      'bonus': new FormControl(bonus, Validators.required),
      'checkRcvd': new FormControl(checkRcvd, Validators.required),
      'notes': new FormControl(notes, Validators.required)
    });
  }

  onCancelEdit() {
    this.eventService.setEventEdit(false);
    this.router.navigate([], {relativeTo: this.route});
  }

  onSubmit() {
    if(this.currentVenueID == 1) {
      this.updatePncEvent();
      this.eventService.getContractInfo().subscribe(contract => {
        this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
          this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
          this.eventService.editPncEvent(this.event).subscribe(res => {
            this.eventService.getAllEventsPnc().subscribe(events => {
              this.eventService.setEventsPnc(events);
              this.onCancelEdit();
            });
          });
        });
      });
    }
    else if(this.currentVenueID == 2) {

    }
    else if(this.currentVenueID == 3) {

    }
  }



  updatePncEvent() {
    this.event.Title = this.editEventForm.value['eventTitle'];
    this.event.Date = this.editEventForm.value['dateTime'];
    console.log('date: ' + this.event.Date);
    this.event.location = this.editEventForm.value['inputLocation'];
    this.event.coordinatorAdminAmt = parseFloat(this.editEventForm.value['coordinatorAdminAmt']);
    this.event.venueBonus = parseFloat(this.editEventForm.value['bonus']);
    this.event.actualCheck = parseFloat(this.editEventForm.value['checkRcvd']);
    this.event.eventNotes = this.editEventForm.value['notes'];
    this.event.closed = this.editEventForm.value['closed'];
    this.event.metCommissionBonus = this.editEventForm.value['commBonus'];
    this.event.guarantee = this.editEventForm.value['guarantee'];
    this.event.totalSales = parseFloat(this.editEventForm.value['totalSales']);
    this.event.alcSales = parseFloat(this.editEventForm.value['alcSales']);
    this.event.eventCountsTowardsTotal = this.editEventForm.value['countTotal'];
  }

}
