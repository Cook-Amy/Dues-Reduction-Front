import { Event } from './../../../models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MathService } from './../../math.service';
import { Staff } from './../../../models/staff.model';
import { StaffService } from './../../../staff/staff.service';
import { Timesheet } from './../../../models/timesheet.model';
import { Job } from './../../../models/job.model';
import { EventService } from './../../event.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Season } from 'src/app/models/season.model';

@Component({
  selector: 'app-event-staff-add',
  templateUrl: './event-staff-add.component.html',
  styleUrls: ['./event-staff-add.component.css']
})
export class EventStaffAddComponent implements OnInit {
  @Input() event: Event;
  @Input() currentSeasonID: number;

  currentSeason: Season;
  staffAddForm: FormGroup;
  jobs: Job[] = [];
  staff: Staff[] = [];
  timesheet: Timesheet;
  idVenue: number;
  interval: number = 15;
  modalOptions: NgbModalOptions;

  constructor(private eventService: EventService,
    private staffService: StaffService,
    private mathService: MathService,
    private route: ActivatedRoute,
    private router: Router,
    public activeModal: NgbActiveModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
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

    if (this.idVenue == 1) {
      this.eventService.getPncJobs().subscribe(jobs => {
        jobs.forEach(job => {
          this.jobs.push(job);
        });
      });

      this.staffService.getActivePncStaff().subscribe(staff => {
        this.staffService.setActivePncStaff(staff);
        this.staff = this.staffService.returnActivePncStaff();
      });
    }

    else if (this.idVenue == 2) {
      this.eventService.getWcJobs().subscribe(jobs => {
        jobs.forEach(job => {
          this.jobs.push(job);
        });
      });

      this.staffService.getActiveWcStaff().subscribe(staff => {
        this.staffService.setActiveWcStaff(staff);
        this.staff = this.staffService.returnActiveWcStaff();
      });
    }

    else if (this.idVenue == 3) {
      this.eventService.getCfJobs().subscribe(jobs => {
        jobs.forEach(job => {
          this.jobs.push(job);
        });
      });

      this.staffService.getActiveCfStaff().subscribe(staff => {
        this.staffService.setActiveCfStaff(staff);
        this.staff = this.staffService.returnActiveCfStaff();
      });
    }

    this.onChanges();
  }

  initForm() {
    let member: string;
    let position: string;
    let rate: number;
    let scheduledArrivalTime: Date;
    let timeIn: Date;
    let timeOut: Date;
    let shuttleBonus: number;
    let eventBonus: number;
    let hourlyBonus: number;

    this.staffAddForm = new FormGroup({
      'member': new FormControl(member, Validators.required),
      'position': new FormControl(position, Validators.required),
      'rate': new FormControl(rate, Validators.required),
      'scheduledArrivalTime': new FormControl(scheduledArrivalTime, Validators.required),
      'timeIn': new FormControl(timeIn, Validators.required),
      'timeOut': new FormControl(timeOut, Validators.required),
      'shuttleBonus': new FormControl(shuttleBonus, Validators.required),
      'eventBonus': new FormControl(eventBonus, Validators.required),
      'hourlyBonus': new FormControl(hourlyBonus, Validators.required)
    });
  }

  onChanges() {
    // when staff position changes
    this.staffAddForm.get('position').valueChanges.subscribe(val => {
      this.jobs.forEach(job => {
        if (job.jobName == val) {
          this.staffAddForm.patchValue({
            rate: job.hourlyRate
          });
          // update scheduled arrival time
          var newTime = new Date(this.computeScheduledArrival(
            this.event.Date,
            job.minutesBeforeOpen));

          // update TimeIn and TimeOut
          var timeIn = newTime;
          var timeOut = timeIn;

          this.staffAddForm.patchValue({
            scheduledArrivalTime: newTime,
            timeIn: timeIn,
            timeOut: timeOut
          });
        }
      });
    });

    // when arrival time changes
    this.staffAddForm.get('scheduledArrivalTime').valueChanges.subscribe(val => {
      this.staffAddForm.patchValue({
        timeIn: val,
        timeOut: val
      });
    });
  }

  computeScheduledArrival(eventTimeDate, min) {
    var newTime = new Date(eventTimeDate);
    newTime.setMinutes(newTime.getMinutes() - min);
    return newTime;
  }

  onSubmit() {
    this.createTimesheet();
    this.timesheet = this.mathService.calculateOneTimeSheet(this.timesheet);
    this.eventService.addToTimesheets(this.timesheet);
    this.eventService.addTimesheetinDB(this.timesheet, this.event.idevent).subscribe(id => {
      this.timesheet.idtimesheet = id;
      if (this.idVenue == 1 && this.currentSeasonID <= 3) {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close("added");
              });
            });
          });
        });
      }

      else if (this.idVenue == 1 && this.currentSeasonID == 4) {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent2020(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close("added");
              });
            });
          });
        });
      }

      else if (this.idVenue == 1 && this.currentSeasonID >= 5) {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent2021(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close("added");
              });
            });
          });
        });
      }

      else if (this.idVenue == 2 && this.currentSeasonID <= 3) {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close("added");
              });
            });
          });
        });
      }

      else if (this.idVenue == 2 && this.currentSeasonID >= 4) {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent2020(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close("added");
              });
            });
          });
        });
      }

      else if (this.idVenue == 3) {
        this.eventService.getCfContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateCfEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close("added");
              });
            });
          });
        });
      }
    });
  }

  createTimesheet() {
    var personID = 0;
    var first = '';
    var last = '';
    var jobID = 0;
    var guar = false;

    this.staff.forEach(st => {
      if (st.Name == this.staffAddForm.value['member']) {
        personID = st.idperson;
        first = st.firstName;
        last = st.lastName;
      }
    });
    this.jobs.forEach(job => {
      if (job.jobName == this.staffAddForm.value['position']) {
        jobID = job.jobID;
        guar = job.isGuarantee;
      }
    });

    this.timesheet = new Timesheet(
      0,
      first,
      last,
      personID,
      this.staffAddForm.value['position'],
      jobID,
      this.staffAddForm.value['scheduledArrivalTime'],
      this.staffAddForm.value['rate'],
      this.staffAddForm.value['timeIn'],
      this.staffAddForm.value['timeOut'],
      0,
      this.staffAddForm.value['shuttleBonus'],
      this.staffAddForm.value['eventBonus'],
      this.staffAddForm.value['hourlyBonus'],
      0,
      0,
      guar,
      0,
      null
    );
  }

  // CHECK DATE
  // First, make sure date matches event date
  // Second, if time out is after midnight, make sure date is the next day
  checkDate(dateVal, inDateVal, outDate = null) {
    console.log("starting date value: " + dateVal);
    var eventDate = new Date(this.event.Date);
    var timesheetDate = new Date(dateVal);

    var mm = eventDate.getMonth();
    var dd = eventDate.getDate();
    var yyyy = eventDate.getFullYear();

    // check for timeOut that is after midnight
    if (inDateVal && outDate) {
      console.log("checking timeOut");
      var timein = new Date(inDateVal);
      var timeout = timesheetDate;

      if (timein.getTime() > timeout.getTime())
        console.log("Time out is before time in");
      dd = eventDate.getDate() + 1;
    }

    timesheetDate.setMonth(mm);
    timesheetDate.setDate(dd);
    timesheetDate.setFullYear(yyyy);

    console.log("ending date value: " + timesheetDate.toString());
    return timesheetDate.toString();
  }
}
