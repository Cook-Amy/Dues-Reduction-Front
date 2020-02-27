import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExcelService } from './../../../createReports/excel.service';
import { VenueService } from './../../../venues/venue.service';
import { EventCF } from './../../../models/eventCF.model';
import { EventWC } from './../../../models/eventWC.model';
import { Timesheet } from './../../../models/timesheet.model';
import { EventPNC } from './../../../models/eventPNC.model';
import { EventService } from './../../event.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() event: EventPNC;
  @Input() event2: EventWC;
  @Input() event3: EventCF;
  @Input() currentVenueID: number;

  timesheet: Timesheet[] = [];
  getStaff = null;
  eventEdit: Boolean;
  confirmDelete = false;
  confirmGateList = false;
  gateListForm: FormGroup;


  constructor(private eventService: EventService,
              private excelService: ExcelService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() { 
    this.eventEdit = this.eventService.getEventEdit();
    this.eventService.eventEditChanged.subscribe(newEditChanged => {
      this.eventEdit = newEditChanged;
    });

    this.initForm();
  }

  private initForm() {
    let emailGateList = true;
    let downloadGateList = false;
    
    this.gateListForm = new FormGroup({
      'emailGateList': new FormControl(emailGateList, Validators.required),
      'downloadGateList': new FormControl(downloadGateList, Validators.required)
    });
  }

  onGateListSubmit() {
    let email = this.gateListForm.value['emailGateList'];
    let download = this.gateListForm.value['downloadGateList'];
    this.excelService.generateGateList(this.event, email, download);
    this.confirmGateList = false;

  }

  getTimesheetForEvent() {
    if(this.currentVenueID == 1) {
      this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(res => {
        this.getStaff = 1;
        this.timesheet = res;
        // console.log("timesheets: " + this.timesheet[1].firstName);
      });
    }

    else if(this.currentVenueID == 2) {
      this.eventService.getTimesheetForEvent(this.event2.idevent).subscribe(res => {
        this.getStaff = 1;
        this.timesheet = res;
        // console.log("timesheets: " + this.timesheet[1].firstName);
      });
    }

    if(this.currentVenueID == 3) {
      this.eventService.getTimesheetForEvent(this.event3.idevent).subscribe(res => {
        this.getStaff = 1;
        this.timesheet = res;
        // console.log("timesheets: " + this.timesheet[1].firstName);
      });
    }
  }

  onEditEvent() {
    this.eventEdit = true;
  }

  onDeleteEvent() {
    this.confirmDelete = true;
  }

  onDeleteNo() {
    this.confirmDelete = false;
  }

  // TODO: Event is not being removed from list on first delete
  onDeleteYes() {
    if(this.currentVenueID == 1) {
      this.eventService.deletePncEvent(this.event).subscribe(res => {
        this.eventService.getAllEventsPnc().subscribe(events => {
          this.eventService.setEventsPnc(events);
          this.router.navigate([], {relativeTo: this.route});
          this.confirmDelete = false;
        });
      });
    }
  }


  getTime(date) {
    if(date == null) {
      date = this.checkForNullString(date);
    }
    var newDate: Date = new Date(date);
    var hours = newDate.getHours();
    var night = "PM";
    if(hours < 12) {
      night = "AM";
    }
    if(hours > 12) {
      hours -= 12;
    }
    // var min = newDate.getMinutes();
    var min = (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes();

    var convertDate = hours + ':' + min + " " + night;
    return convertDate;
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

  onAddStaff() {}

  onDeleteStaff() {}

  onAddBonus() {}

}
