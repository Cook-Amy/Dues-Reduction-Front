import { ActivatedRoute, Router } from '@angular/router';
import { MathService } from './../../math.service';
import { Staff } from './../../../models/staff.model';
import { StaffService } from './../../../staff/staff.service';
import { Timesheet } from './../../../models/timesheet.model';
import { Job } from './../../../models/job.model';
import { EventService } from './../../event.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventPNC } from './../../../models/eventPNC.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-staff-add',
  templateUrl: './event-staff-add.component.html',
  styleUrls: ['./event-staff-add.component.css']
})
export class EventStaffAddComponent implements OnInit {
  @Input() event: EventPNC;

  staffAddForm: FormGroup;
  jobs: Job[] = [];
  staff: Staff[] = [];
  timesheet: Timesheet;

  constructor(private eventService: EventService,
              private staffService: StaffService,
              private mathService: MathService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.initForm();

    this.eventService.getPncJobs().subscribe(jobs => {
      jobs.forEach(job => {
        this.jobs.push(job);
      });
    });

    this.staffService.getActivePncStaff().subscribe(staff => {
      this.staffService.setActivePncStaff(staff);
      this.staff = this.staffService.returnActivePncStaff();
    });

    this.onChanges();
  }

  initForm() {
    let member: string;
    let position: string;
    let rate: number;
    let scheduledArrivalTime: Date;
    let timeIn: Date;
    let timeOut: Date;
    let eventBonus: number;
    let hourlyBonus: number;

    this.staffAddForm = new FormGroup({
      'member': new FormControl(member, Validators.required),
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
    this.staffAddForm.get('position').valueChanges.subscribe(val => {
      this.jobs.forEach(job => {
        if(job.jobName == val) {
          this.staffAddForm.patchValue({
            rate: job.hourlyRate
          });
          // update scheduled arrival time
          var newTime = new Date(this.computeScheduledArrival(
                                      this.event.Date, 
                                      job.minutesBeforeOpen));
          this.staffAddForm.patchValue({
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

  onSubmit() {
    this.createTimesheet();
    this.timesheet = this.mathService.calculateOneTimeSheet(this.timesheet);
    this.eventService.updateTimesheets(this.timesheet);
    this.eventService.addTimesheetinDB(this.timesheet, this.event.idevent).subscribe(id => {
      this.timesheet.idtimesheet = id;
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

  onCancelAdd() {
    this.eventService.setEventStaffAdd(false);
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
      if(job.jobName == this.staffAddForm.value['position']) {
        jobID = job.jobID;
        guar = job.isGuarantee;
      }
    });
    console.log("position: " + this.staffAddForm.value['position']);
    console.log("jobID: " + jobID);

    console.log("personID: " + personID);
    console.log("member: " + this.staffAddForm.value['member']);

    this.timesheet = new Timesheet(
      0, 
      first,
      last,
      personID,
      this.staffAddForm.value['position'],
      jobID,
      this.staffAddForm.value['scheduledArrivalTime'],
      this.staffAddForm.value['hourlyRate'],
      this.staffAddForm.value['timeIn'],
      this.staffAddForm.valueChanges['timeOut'],
      0,
      0,
      this.staffAddForm.value['eventBonus'],
      this.staffAddForm.value['hourlyBonus'],
      0,
      0,
      guar,
      0
    );
  }

}
