import { MathService } from './../../math.service';
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
  eventStaffEdit: Boolean;
  eventStaffAdd: Boolean;
  editTimesheet: Timesheet;
  confirmDelete = false;
  confirmGateList = false;
  gateListForm: FormGroup;
  addEventBonus = false;
  addHourlyBonus = false;
  eventTimeDate: Date;
  eventID: number;
  ebForm: FormGroup;
  hbForm: FormGroup;


  constructor(private eventService: EventService,
              private excelService: ExcelService,
              private mathService: MathService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() { 
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

  onGateListSubmit() {
    let email = this.gateListForm.value['emailGateList'];
    let download = this.gateListForm.value['downloadGateList'];

    this.excelService.getStaffForEvent(this.event.idevent).subscribe(res => {
      this.excelService.generateGateList(this.event, res).subscribe(results => {
      });
    });
    this.confirmGateList = false;
  }

  getTimesheetForEvent() {
    if(this.currentVenueID == 1) {
      this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(res => {
        this.getStaff = 1;
        this.eventID = this.event.idevent;
        this.eventService.setTimesheets(res);
        this.timesheet = this.eventService.returnTimesheets();
      });
    }

    else if(this.currentVenueID == 2) {
      this.eventService.getTimesheetForEvent(this.event2.idevent).subscribe(res => {
        this.getStaff = 1;
        this.eventID = this.event2.idevent;
        this.timesheet = res;
      });
    }

    if(this.currentVenueID == 3) {
      this.eventService.getTimesheetForEvent(this.event3.idevent).subscribe(res => {
        this.getStaff = 1;
        this.eventID = this.event3.idevent;
        this.timesheet = res;
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

  onAddEventBonus() { 
    this.addHourlyBonus = false;
    this.addEventBonus = true; 
  }

  onAddHourlyBonus() { 
    this.addEventBonus = false;
    this.addHourlyBonus = true; 
  }

  onEventBonusAdded() {
    var eb = this.ebForm.value['ebAmount'];
    this.timesheet.forEach(ts => {
      ts.eventBonus += eb;
    });

    this.mathService.calculateTimeSheets(this.timesheet);
    this.eventService.setTimesheets(this.timesheet);
    this.eventService.updateAllTimesheetsInDB(this.timesheet).subscribe(res => {
      this.eventService.getContractInfo().subscribe(contract => {
        this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
          this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
          this.eventService.editPncEvent(this.event).subscribe(res => {
            this.eventService.getAllEventsPnc().subscribe(events => {
              this.eventService.setEventsPnc(events);
              this.eventService.setEventStaffEdit(false);
              // this.router.navigate([], {relativeTo: this.route});
              this.onCancelBonus();
            });
          });
        });
      });
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
      this.eventService.getContractInfo().subscribe(contract => {
        this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
          this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
          this.eventService.editPncEvent(this.event).subscribe(res => {
            this.eventService.getAllEventsPnc().subscribe(events => {
              this.eventService.setEventsPnc(events);
              this.eventService.setEventStaffEdit(false);
              // this.router.navigate([], {relativeTo: this.route});
              this.onCancelBonus();
            });
          });
        });
      });
    });
  }

  onCancelBonus() {
    this.addEventBonus = false;
    this.addHourlyBonus = false;
  }

}
