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

  constructor(private eventService: EventService,
              private excelService: ExcelService) { }

  ngOnInit() { }

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

  sendGateList() {
    this.excelService.generateGateList(this.event);
  }

}
