import { ActivatedRoute, Router } from '@angular/router';
import { EventPNC } from './../../../models/eventPNC.model';
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
  @Input() event: EventPNC;

  name: string;
  pos: string;
  rate: number;
  arrivalTime: string;
  timeIn: string;
  timeOut: string;
  eventBonus: number;
  hourlyBonus: number;
  askDelete = false;

  jobs: Job[] = [];
  staffEditForm: FormGroup;

  constructor(public eventService: EventService,
              public mathService: MathService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.setUpTimesheet();
    this.initForm();

    this.eventService.getPncJobs().subscribe(jobs => {
      jobs.forEach(job => {
        this.jobs.push(job);
      });
    });

    this.onChanges();
  }

  setUpTimesheet() {
    this.name = this.timesheet.lastName + ", " + this.timesheet.firstName;
    this.pos = this.timesheet.jobName;
    this.rate = this.timesheet.hourlyRate;
    this.arrivalTime = this.timesheet.scheduledArrivalTime;
    this.timeIn = this.timesheet.timeIn;
    this.timeOut = this.timesheet.timeOut;
    this.eventBonus = this.timesheet.eventBonus;
    this.hourlyBonus = this.timesheet.hourlyBonus;
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
      this.eventService.getContractInfo().subscribe(contract => {
        this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
          this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
          this.eventService.editPncEvent(this.event).subscribe(res => {
            this.eventService.getAllEventsPnc().subscribe(events => {
              this.eventService.setEventsPnc(events);
              this.eventService.setEventStaffEdit(false);
              this.router.navigate([], {relativeTo: this.route});
            });
          });
        });
      });
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
    this.askDelete = true;
  }

  onDeleteYes() {

  }

  onDeleteNo() {
    this.askDelete = false;
  }

}
