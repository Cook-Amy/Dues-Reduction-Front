import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './../../event.service';
import { EventPNC } from './../../../models/eventPNC.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.css']
})
export class EventNewComponent implements OnInit {
  @Input() currentVenueID: number;
  public dateValue: Date;
  newEventForm: FormGroup;
  newPncEvent: EventPNC;
  allPncEvents: EventPNC[];

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.allPncEvents = this.eventService.getEventsPnc("dateAscending");
    this.dateValue = this.getToday();
    this.initForm();
  }

  getDateValue() {
    console.log("date: " + this.dateValue);
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

  onSubmit() {
    if(this.currentVenueID == 1) {
      var sales = this.newEventForm.value['totalSales'];
      var alc = this.newEventForm.value['alcSales'];
      if(sales > 0 || alc > 0) {
        this.doEventMath(sales, alc);
      }

      // try this instead of createNewEvent()
      //  this.newPncEvent = this.newEventForm.value;


      this.createNewEvent();
      this.eventService.setNewPncEvent(this.newPncEvent).subscribe(res => {
        this.allPncEvents.push(this.newPncEvent);
        this.eventService.setEventsPnc(this.allPncEvents);
        this.allPncEvents = this.eventService.getEventsPnc("dateAscending");
      });
    }

    this.onCancel();
  }

  onCancel() {
    this.eventService.setEventNew(false);
    this.router.navigate([], {relativeTo: this.route});
  }
 
  private initForm() {
    let eventTitle = "";
    let dateTime = this.dateValue;
    let inputLocation = "S109";
    let commBonus = false;
    let guarantee = false; 
    let countTotal = false;
    let closed = false;
    let totalSales = 0;
    let alcSales = 0;
    let bonus = 0;
    let checkRcvd = 0;
    let notes = "";

    this.newEventForm = new FormGroup({
      'eventTitle': new FormControl(eventTitle, Validators.required),
      'dateTime': new FormControl(dateTime, Validators.required),
      'inputLocation': new FormControl(inputLocation, Validators.required),
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

  doEventMath(sales, alc) {
    // TODO: calculate event figures
  }

  createNewEvent() {
    var pncEvent = new EventPNC(
      0, 
      this.newEventForm.value['dateTime'],
      this.newEventForm.value['eventTitle'],
      true,
      this.newEventForm.value['inputLocation'],
      this.newEventForm.value['bonus'],
      0,
      0,
      this.newEventForm.value['checkRcvd'],
      0,
      0,
      0,
      0,
      0,
      0,
      this.newEventForm.value['notes'],
      this.newEventForm.value['closed'],
      0,
      this.newEventForm.value['commBonus'],
      this.newEventForm.value['guarantee'],
      this.newEventForm.value['totalSales'],
      this.newEventForm.value['alcSales'],
      30,
      this.newEventForm.value['countTotal'] 
    );
    this.newPncEvent = pncEvent;
  }

}
