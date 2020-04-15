import { ToastrService } from 'ngx-toastr';
import { EmailService } from './../../../email/email.service';
import { Event } from './../../../models/event.model';
import { MathService } from './../../math.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GateListService } from '../../../createReports/gateList.service';
import { Timesheet } from './../../../models/timesheet.model';
import { EventService } from './../../event.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() event: Event;
  @Input() currentVenueID: number;
  idVenue: number;

  timesheet: Timesheet[] = [];
  getStaff = null;
  eventEdit: Boolean;
  eventStaffEdit: Boolean;
  eventStaffAdd: Boolean;
  editTimesheet: Timesheet;
  confirmDelete = false;
  confirmGateList = false;
  gateListForm: FormGroup;
  addShuttleBonus = false;
  addEventBonus = false;
  addHourlyBonus = false;
  eventTimeDate: Date;
  eventID: number;
  sbForm: FormGroup;
  ebForm: FormGroup;
  hbForm: FormGroup;
  reminderInfo = false;
  checklist: any[] = [];
  checkedList: any[];
  masterSelected: boolean; 
  noStaffMsg: boolean = false;

  constructor(private eventService: EventService,
              private gateListService: GateListService,
              private mathService: MathService,
              private emailService: EmailService,
              private toastr: ToastrService) { }

  ngOnInit() { 
    this.masterSelected = false;
    this.idVenue = this.event.venueID;
    this.eventEdit = this.eventService.getEventEdit();
    this.eventStaffEdit = this.eventService.getEventStaffEdit();
    this.eventService.eventEditChanged.subscribe(newEditChanged => {
      this.eventEdit = newEditChanged;
    });
    this.eventService.eventStaffEditChanged.subscribe(newStaffEditChanged => {
      this.eventStaffEdit = newStaffEditChanged;
 
    });
    this.eventService.eventStaffAddChanged.subscribe(newStaffAddChanged => {
      this.eventStaffAdd = newStaffAddChanged;
    });

    this.initForm1();
    this.initForm2();
    this.initForm3();
    this.initForm4();
  }

  private initForm1() {
    let emailGateList = true;
    let downloadGateList = false;
    
    this.gateListForm = new FormGroup({
      'emailGateList': new FormControl(emailGateList, Validators.required),
      'downloadGateList': new FormControl(downloadGateList, Validators.required)
    });
  }

  private initForm2() {
    let ebAmount = 0;

    this.ebForm = new FormGroup({
      'ebAmount': new FormControl(ebAmount, Validators.required)
    });
  }

  private initForm3() {
    let hbAmount = 0;

    this.hbForm = new FormGroup({
      'hbAmount': new FormControl(hbAmount, Validators.required)
    });
  }

  private initForm4() {
    let sbAmount = 0;
    this.sbForm = new FormGroup({
      'sbAmount': new FormControl(sbAmount, Validators.required)
    });
  }

  onGateListSubmit() {
    let email = this.gateListForm.value['emailGateList'];
    let download = this.gateListForm.value['downloadGateList'];

    if(email || download) {
      this.gateListService.getStaffForEvent(this.event.idevent).subscribe(staff => {
        if(!staff) {
          this.confirmGateList = false;
          this.noStaffMsg = true;
        }
        else {
          if(this.currentVenueID == 1) {
            this.gateListService.generatePncGateList(this.event, staff, email, download).subscribe(results => {
              if(email) {
                this.toastr.success("Gate List was emailed.", "SUCCESS!", {
                  closeButton: true,
                  timeOut: 3000
                });
              }
              if(download) {
                window.open(window.URL.createObjectURL(results));
              }
              this.confirmGateList = false; 
             });
          }
          else if(this.currentVenueID == 2) {
            this.gateListService.generateWcGateList(this.event, staff, email, download). subscribe(results => {
              if(email) {
                this.toastr.success("Gate List was emailed.", "SUCCESS!", {
                  closeButton: true,
                  timeOut: 3000
                });
              }
              if(download) {
                window.open(window.URL.createObjectURL(results));
              }
             this.confirmGateList = false; 
             });
          }
        }
    });
    }
  }

  getTimesheetForEvent() {
    this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(res => {
      this.getStaff = 1;
      this.eventID = this.event.idevent;
      this.eventService.setTimesheets(res);
      this.timesheet = this.eventService.returnTimesheets();
      if(this.timesheet) {
        this.timesheet.forEach(ts => {
          this.checklist.push({
            id: ts.idtimesheet,
            name: ts.lastName + ", " + ts.firstName,
            jobName: ts.jobName,
            isSelected: false
          });
        });
      }
    });
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
   
    this.eventService.deleteEvent(this.event).subscribe(res => {
      this.eventService.getAllEvents().subscribe(events => {
        this.eventService.setAllEvents(events);
        // this.router.navigate([], {relativeTo: this.route});
        this.confirmDelete = false;
      });
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

  checkForNullString(string) {
    if(string == null)
      return '0';
    else  
      return string;
  }

  checkForNullNum(num) {
    if(num == null)
      return 0;
    else  {
      return num;
    }
  }

  onEditStaff(sheet: Timesheet) {
    this.editTimesheet = sheet;
    this.eventStaffEdit = true;
  }

  onAddStaff() {
    this.eventStaffAdd = true;
  }

  onAddShuttleBonus() {
    this.addHourlyBonus = false;
    this.addEventBonus = false;
    this.addShuttleBonus = true;

  }

  onAddEventBonus() { 
    this.addHourlyBonus = false;
    this.addShuttleBonus = false;
    this.addEventBonus = true; 
  }

  onAddHourlyBonus() { 
    this.addEventBonus = false;
    this.addShuttleBonus = false;
    this.addHourlyBonus = true; 
  }

  onShuttleBonusAdded() {
    var sb = this.sbForm.value['sbAmount'];
    this.timesheet.forEach(ts => {
      ts.shuttleBonus += sb;
    });

    this.mathService.calculateTimeSheets(this.timesheet);
    this.eventService.setTimesheets(this.timesheet);
    this.eventService.updateAllTimesheetsInDB(this.timesheet).subscribe(res => {

      if(this.currentVenueID == 1) {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                // this.router.navigate([], {relativeTo: this.route});
                this.onCancelBonus();
              });
            });
          });
        });
      }

      else if(this.currentVenueID == 2) {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                // this.router.navigate([], {relativeTo: this.route});
                this.onCancelBonus();
              });
            });
          });
        });
      }

      else if(this.currentVenueID == 3) {
        this.eventService.getCfContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateCfEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                // this.router.navigate([], {relativeTo: this.route});
                this.onCancelBonus();
              });
            });
          });
        });
      }
    });
  }

  onEventBonusAdded() {
    var eb = this.ebForm.value['ebAmount'];
    this.timesheet.forEach(ts => {
      ts.eventBonus += eb;
    });

    this.mathService.calculateTimeSheets(this.timesheet);
    this.eventService.setTimesheets(this.timesheet);
    this.eventService.updateAllTimesheetsInDB(this.timesheet).subscribe(res => {

      if(this.currentVenueID == 1) {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                // this.router.navigate([], {relativeTo: this.route});
                this.onCancelBonus();
              });
            });
          });
        });
      }

      else if(this.currentVenueID == 2) {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                // this.router.navigate([], {relativeTo: this.route});
                this.onCancelBonus();
              });
            });
          });
        });
      }

      else if(this.currentVenueID == 3) {
        this.eventService.getCfContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateCfEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                // this.router.navigate([], {relativeTo: this.route});
                this.onCancelBonus();
              });
            });
          });
        });
      }
    });
  }

  onHourlyBonusAdded() {
    var hb = this.hbForm.value['hbAmount'];
    this.timesheet.forEach(ts => {
      ts.hourlyBonus += hb;
    });

    this.mathService.calculateTimeSheets(this.timesheet);
    this.eventService.setTimesheets(this.timesheet);
    this.eventService.updateAllTimesheetsInDB(this.timesheet).subscribe(res => {
      if(this.currentVenueID == 1) {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                // this.router.navigate([], {relativeTo: this.route});
                this.onCancelBonus();
              });
            });
          });
        });
      }

      else if(this.currentVenueID == 2) {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                // this.router.navigate([], {relativeTo: this.route});
                this.onCancelBonus();
              });
            });
          });
        });
      }

      else if(this.currentVenueID == 3) {
        this.eventService.getCfContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateCfEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                // this.router.navigate([], {relativeTo: this.route});
                this.onCancelBonus();
              });
            });
          });
        });
      }
    });
  }

  onCancelBonus() {
    this.addShuttleBonus = false;
    this.addEventBonus = false;
    this.addHourlyBonus = false;
  }

  onSendReminder() {
    this.reminderInfo = true;
  }

  onCancelReminder() {
    this.reminderInfo = false;
  }

  onSubmitReminder() {
    // TODO: log last reminder date

    this.getCheckedItemList();
    var list = this.checkedList;

    if(this.idVenue == 1) {
      this.emailService.sendPncReminderEmail(list, this.event.idevent).subscribe(res => {
          this.toastr.success("Event reminder was emailed.", "SUCCESS!", {
            closeButton: true,
            timeOut: 3000
          });
        this.onCancelReminder();
      });
    }

    else if(this.idVenue == 2) {
      this.emailService.sendWcReminderEmail(list, this.event.idevent).subscribe(res => {
        this.toastr.success("Event reminder was emailed.", "SUCCESS!", {
          closeButton: true,
          timeOut: 3000
        });
        this.onCancelReminder();
      });
    }

    else if(this.idVenue == 3) {
      this.emailService.sendCfReminderEmail(list, this.event.idevent).subscribe(res => {
        this.toastr.success("Event reminder was emailed.", "SUCCESS!", {
          closeButton: true,
          timeOut: 3000
        });
        this.onCancelReminder();
      });
    }
  }

  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
   
  isAllSelected() {
    this.masterSelected = this.checklist.every(function(item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for(var i = 0; i < this.checklist.length; i++) {
      if(this.checklist[i].isSelected) {
        this.checkedList.push(this.checklist[i]);
      }
    }
  }

  onOkNoStaff() {
    this.noStaffMsg = false;
  }
}
