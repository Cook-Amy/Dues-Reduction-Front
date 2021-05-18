import { Event } from './../../../models/event.model';
import { Timesheet } from './../../../models/timesheet.model';
import { EventService } from './../../event.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EventEditComponent } from './../event-edit/event-edit.component';
import { ConfirmDeleteComponent } from './modals/confirm-delete/confirm-delete.component';
import { EventStaffEditComponent } from '../event-staff-edit/event-staff-edit.component';
import { EventStaffAddComponent } from '../event-staff-add/event-staff-add.component';
import { AddShuttleBonusComponent } from './modals/add-shuttle-bonus/add-shuttle-bonus.component';
import { AddEventBonusComponent } from './modals/add-event-bonus/add-event-bonus.component';
import { AddHourlyBonusComponent } from './modals/add-hourly-bonus/add-hourly-bonus.component';
import { SendEventReminderComponent } from './modals/send-event-reminder/send-event-reminder.component';
import { SendGateListComponent } from './modals/send-gate-list/send-gate-list.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() setEvent: Event[];
  @Input() currentVenueID: number;
  @Input() currentSeasonID: number;

  modalOptions:NgbModalOptions;

  event: Event;
  idVenue: number;

  timesheet: Timesheet[] = [];
  getStaff = null;
  eventEdit: Boolean;
  eventStaffEdit: Boolean;
  eventStaffAdd: Boolean;
  editTimesheet: Timesheet;
  eventID: number;
  checklist: any[] = [];

  constructor(private eventService: EventService,
              private modalServices: NgbModal) { 
                this.modalOptions = {
                  backdrop: 'static',
                  backdropClass:'customBackdrop',
                  size: 'xl',
                  centered: true
               }
              }

  ngOnInit() { 
    this.event = this.setEvent[0];
    this.idVenue = this.event.venueID;
    this.eventEdit = this.eventService.getEventEdit();
    this.eventStaffEdit = this.eventService.getEventStaffEdit();
    this.eventService.eventEditChanged.subscribe(newEditChanged => {
      this.eventEdit = newEditChanged;
    });
    this.eventService.eventStaffEditChanged.subscribe(newStaffEditChanged => {
      this.eventStaffEdit = newStaffEditChanged;
      this.getStaff = null; 
      this.getTimesheetForEvent();
    });
    this.eventService.eventStaffAddChanged.subscribe(newStaffAddChanged => {
      this.eventStaffAdd = newStaffAddChanged;
      this.getStaff = null; 
      this.getTimesheetForEvent();
    });
  }

  getTimesheetForEvent() {
    this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(res => {
      this.getStaff = 1;
      this.eventID = this.event.idevent;
      this.eventService.setTimesheets(res);
      this.timesheet = this.eventService.returnTimesheets();
      if(this.timesheet) {
        this.checklist = [];
        this.timesheet.forEach(ts => {
          this.checklist.push({
            id: ts.idtimesheet,
            name: ts.lastName + ", " + ts.firstName,
            jobName: ts.jobName,
            lastReminder: ts.lastReminder,
            isSelected: false
          });
        });
      }
    });
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
    var min = (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes();

    var convertDate = hours + ':' + min + " " + night;
    return convertDate;
  }

  checkForNullString(str) {
    if(str == null)
      return '0';
    else  
      return str;
  }

  checkForNullNum(num) {
    num = parseFloat(num);
    if(num == null || isNaN(num))
      return 0;
    else  {
      return num;
    }
  }

  checkForNullReminder(rm) {
    if(rm == null)
      return '----';
    else 
      return rm;
  }

  onEditStaff(sheet: Timesheet) {
    this.editTimesheet = sheet;
    this.openEditStaff();
  }

  onAddStaff() { this.openAddStaff(); }

  onAddShuttleBonus() { this.openAddShuttleBonus(); }

  onAddEventBonus() { this.openAddEventBonus(); }

  onAddHourlyBonus() { this.openAddHourlyBonus(); }

  onSendReminder() { this.openEventReminder(); }

  openEdit() {
    const modalRef = this.modalServices.open(EventEditComponent);
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.currentVenueID = this.currentVenueID;
    modalRef.componentInstance.currentSeasonID = this.currentSeasonID;
  }

  openDeleteEvent() {
    const modalRef = this.modalServices.open(ConfirmDeleteComponent);
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.currentSeasonID = this.currentSeasonID;
  }

  openEditStaff() {
    const modalRef = this.modalServices.open(EventStaffEditComponent);
    modalRef.componentInstance.timesheet = this.editTimesheet;
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.currentSeasonID = this.currentSeasonID;
    modalRef.result.then((result) => {
      if(result) {
        this.eventService.setEventStaffEdit(true);
      }
    });
  }

  openAddStaff() {
    const modalRef = this.modalServices.open(EventStaffAddComponent);
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.currentSeasonID = this.currentSeasonID;
    modalRef.result.then((result) => {
      if(result) {
        this.eventService.setEventStaffAdd(true);
      }
    });
  }

  openAddShuttleBonus() {
    const modalRef = this.modalServices.open(AddShuttleBonusComponent);
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.currentSeasonID = this.currentSeasonID;
    modalRef.componentInstance.currentVenueID = this.currentVenueID;
    modalRef.componentInstance.timesheet = this.timesheet;
    modalRef.result.then((result) => {
      if(result) {
        this.eventService.setEventStaffEdit(true);
      }
    });
  }

  openAddEventBonus() {
    const modalRef = this.modalServices.open(AddEventBonusComponent);
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.currentSeasonID = this.currentSeasonID;
    modalRef.componentInstance.currentVenueID = this.currentVenueID;
    modalRef.componentInstance.timesheet = this.timesheet;
    modalRef.result.then((result) => {
      if(result) {
        this.eventService.setEventStaffEdit(true);
      }
    });
  }

  openAddHourlyBonus() {
    const modalRef = this.modalServices.open(AddHourlyBonusComponent);
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.currentSeasonID = this.currentSeasonID;
    modalRef.componentInstance.currentVenueID = this.currentVenueID;
    modalRef.componentInstance.timesheet = this.timesheet;
    modalRef.result.then((result) => {
      if(result) {
        this.eventService.setEventStaffEdit(true);
      }
    });
  }

  openEventReminder() {
    const modalRef = this.modalServices.open(SendEventReminderComponent);
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.currentSeasonID = this.currentSeasonID;
    modalRef.componentInstance.currentVenueID = this.currentVenueID;
    modalRef.componentInstance.checklist = this.checklist;
    modalRef.result.then((result) => {
      if(result) {
        this.eventService.setEventStaffEdit(true);
      }
    });
  }

  openSendGateList() {
    const modalRef = this.modalServices.open(SendGateListComponent);
    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.currentVenueID = this.currentVenueID;
  }
}
