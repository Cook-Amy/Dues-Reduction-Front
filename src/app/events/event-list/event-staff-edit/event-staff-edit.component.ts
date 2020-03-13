import { Event } from './../../../models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MathService } from './../../math.service';
import { Job } from './../../../models/job.model';
import { EventService } from './../../event.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Timesheet } from './../../../models/timesheet.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-staff-edit',
  templateUrl: './event-staff-edit.component.html',
  styleUrls: ['./event-staff-edit.component.css']
})
export class EventStaffEditComponent implements OnInit {
  @Input() timesheet: Timesheet;
  @Input() event: Event;

  askDelete = false;
  jobs: Job[] = [];
  staffEditForm: FormGroup;
  idVenue: number;

  constructor(public eventService: EventService,
              public mathService: MathService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.idVenue = this.event.venueID;
    this.initForm();
    if(this.idVenue == 1) {
      this.eventService.getPncJobs().subscribe(jobs => {
        jobs.forEach(job => {
          this.jobs.push(job);
        });
      });
    }

    else if(this.idVenue == 2) {
      this.eventService.getWcJobs().subscribe(jobs => {
        jobs.forEach(job => {
          this.jobs.push(job);
        });
      });
    }

    else if(this.idVenue == 3) {
      this.eventService.getCfJobs().subscribe(jobs => {
        jobs.forEach(job => {
          this.jobs.push(job);
        });
      });
    }
    this.onChanges();
  }

  initForm() {
    let position = this.timesheet.jobName;
    let rate = this.timesheet.hourlyRate;
    let scheduledArrivalTime = this.timesheet.scheduledArrivalTime;
    let timeIn = this.timesheet.timeIn;
    let timeOut = this.timesheet.timeOut;
    let eventBonus = this.timesheet.eventBonus;
    let hourlyBonus = this.timesheet.hourlyBonus;

    this.staffEditForm = new FormGroup({
      'position': new FormControl(position, Validators.required),
      'rate': new FormControl(rate, Validators.required),
      'scheduledArrivalTime': new FormControl(scheduledArrivalTime, Validators.required),
      'timeIn': new FormControl(timeIn, Validators.required),
      'timeOut': new FormControl(timeOut, Validators.required),
      'eventBonus': new FormControl(eventBonus, Validators.required),
      'hourlyBonus': new FormControl(hourlyBonus, Validators.required)
    });
  }

  onChanges() {
    this.staffEditForm.get('position').valueChanges.subscribe(val => {
      this.jobs.forEach(job => {
        if(job.jobName == val) {
          this.staffEditForm.patchValue({
            rate: job.hourlyRate
          });
          this.timesheet.jobID = job.jobID;
          // update scheduled arrival time
          var newTime = new Date(this.computeScheduledArrival(
                                      this.event.Date, 
                                      job.minutesBeforeOpen));
          this.staffEditForm.patchValue({
            scheduledArrivalTime: newTime
          });
        }
      });
    });
  }

  computeScheduledArrival(eventTimeDate, min) {
    var newTime = new Date(eventTimeDate);
    newTime.setMinutes(newTime.getMinutes() - min);
    return newTime;
  }

  onCancelEdit() {
    this.eventService.setEventStaffEdit(false);
  }

  onSubmit() {
    this.updateTimesheet();

    this.timesheet = this.mathService.calculateOneTimeSheet(this.timesheet);
    this.eventService.updateTimesheets(this.timesheet);
    // update timesheet in DB
    this.eventService.updateTimesheetDB(this.timesheet).subscribe(res => {
      if(this.idVenue == 1) {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                this.router.navigate([], {relativeTo: this.route});
              });
            });
          });
        });
      }

      else if(this.idVenue == 2) {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                this.router.navigate([], {relativeTo: this.route});
              });
            });
          });
        });
      }

      else if(this.idVenue == 3) {
        this.eventService.getCfContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateCfEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                this.router.navigate([], {relativeTo: this.route});
              });
            });
          });
        });
      }
    });
  }

  updateTimesheet() {
    this.timesheet.jobName = this.staffEditForm.value['position'];
    this.timesheet.hourlyRate = this.staffEditForm.value['rate'];
    this.timesheet.eventBonus = this.staffEditForm.value['eventBonus'];
    this.timesheet.hourlyBonus = this.staffEditForm.value['hourlyBonus'];
    this.timesheet.scheduledArrivalTime = this.staffEditForm.value['scheduledArrivalTime'];
    this.timesheet.timeIn = this.staffEditForm.value['timeIn'];
    this.timesheet.timeOut = this.staffEditForm.value['timeOut'];
  }

  onDelete() {
    if(this.idVenue == 1) {
      this.eventService.deleteTimesheetinDB(this.timesheet.idtimesheet).subscribe(res => {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                this.router.navigate([], {relativeTo: this.route});
              });
            });
          });
        });
      });
    }

    else if(this.idVenue == 2) {
      this.eventService.deleteTimesheetinDB(this.timesheet.idtimesheet).subscribe(res => {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                this.router.navigate([], {relativeTo: this.route});
              });
            });
          });
        });
      });
    }

    else if(this.idVenue == 3) {
      this.eventService.deleteTimesheetinDB(this.timesheet.idtimesheet).subscribe(res => {
        this.eventService.getCfContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateCfEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                this.router.navigate([], {relativeTo: this.route});
              });
            });
          });
        });
      });
    }

  }

  onDeleteYes() {

  }

  onDeleteNo() {
    this.askDelete = false;
  }

}