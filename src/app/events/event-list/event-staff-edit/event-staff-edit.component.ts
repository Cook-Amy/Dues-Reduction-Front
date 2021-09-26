import { ToastrService } from 'ngx-toastr';
import { Event } from './../../../models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MathService } from './../../math.service';
import { Job } from './../../../models/job.model';
import { EventService } from './../../event.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Timesheet } from './../../../models/timesheet.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Season } from 'src/app/models/season.model';

@Component({
  selector: 'app-event-staff-edit',
  templateUrl: './event-staff-edit.component.html',
  styleUrls: ['./event-staff-edit.component.css']
})
export class EventStaffEditComponent implements OnInit {
  @Input() timesheet: Timesheet;
  @Input() event: Event;
  @Input() currentSeasonID: number;

  currentSeason: Season;
  askDelete = false;
  jobs: Job[] = [];
  staffEditForm: FormGroup;
  idVenue: number;
  interval: number = 15;
  deleteConfirm = false;
  modalOptions: NgbModalOptions;
  deleting = false;

  constructor(public eventService: EventService,
              public mathService: MathService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal) {
                this.modalOptions = {
                  backdrop:'static',
                  backdropClass:'customBackdrop',
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
    let shuttleBonus = this.timesheet.shuttleBonus;
    let eventBonus = this.timesheet.eventBonus;
    let hourlyBonus = this.timesheet.hourlyBonus;

    this.staffEditForm = new FormGroup({
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

          // update TimeIn and TimeOut
          var timeIn = newTime;
          var timeOut = timeIn;

          this.staffEditForm.patchValue({
            scheduledArrivalTime: newTime,
            timeIn: timeIn,
            timeOut: timeOut
          });
        }
      });
    });

    // when arrival time changes
    this.staffEditForm.get('scheduledArrivalTime').valueChanges.subscribe(val => {
      this.staffEditForm.patchValue({
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

  onCancelEdit() {
    this.eventService.setEventStaffEdit(false);
  }

  onSubmit() {
    if(this.deleting)
      return;

    this.updateTimesheet();

    this.timesheet = this.mathService.calculateOneTimeSheet(this.timesheet);
    this.eventService.updateTimesheets(this.timesheet);
    // update timesheet in DB
    this.eventService.updateTimesheetDB(this.timesheet).subscribe(res => {
      if(this.idVenue == 1 && this.currentSeasonID <= 3) {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close("staff edited");
              });
            });
          });
        });
      }

      else if(this.idVenue == 1 && this.currentSeasonID >= 4) {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent2020(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close("staff edited");
              });
            });
          });
        });
      }

      else if(this.idVenue == 2 && this.currentSeasonID <= 3) {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close("staff edited");
              });
            });
          });
        });
      }

      else if(this.idVenue == 2 && this.currentSeasonID >= 4) {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent2020(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close("staff edited");
              });
            });
          });
        });
      }

      else if(this.idVenue == 3) {
        this.eventService.getCfContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateCfEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close("staff edited");
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
    this.timesheet.shuttleBonus = this.staffEditForm.value['shuttleBonus'];
    this.timesheet.eventBonus = this.staffEditForm.value['eventBonus'];
    this.timesheet.hourlyBonus = this.staffEditForm.value['hourlyBonus'];
    this.timesheet.scheduledArrivalTime = this.staffEditForm.value['scheduledArrivalTime'];
    this.timesheet.timeIn = this.checkDate(this.staffEditForm.value['timeIn'], null);
    this.timesheet.timeOut = this.checkDate(this.staffEditForm.value['timeOut'], this.timesheet.timeIn, true);
  }

    // CHECK DATE
      // First, make sure date matches event date
      // Second, if time out is after midnight, make sure date is the next day
  checkDate(dateVal, inDateVal, outDate = null) {
    // console.log("starting date value: " + dateVal);
    var eventDate = new Date(this.event.Date);
    var timesheetDate = new Date(dateVal);

    var mm = eventDate.getMonth();
    var dd = eventDate.getDate();
    var yyyy = eventDate.getFullYear();

    // check for timeOut that is after midnight
    if(inDateVal && outDate) {
      // console.log("checking timeOut");
      var timein = new Date(inDateVal);
      var timeout = timesheetDate;

      if(timein.getTime() > timeout.getTime()) 
      // console.log("Time out is before time in");
        dd = eventDate.getDate() + 1;
    }

    timesheetDate.setMonth(mm);
    timesheetDate.setDate(dd);
    timesheetDate.setFullYear(yyyy);

    // console.log("ending date value: " + timesheetDate.toString());
    return timesheetDate.toString();
  }


  onDeleteConfirm() {
    this.deleteConfirm = true;
  }

  onDeleteNo() {
    this.deleteConfirm = false;
  }

  onDeleteYes() {
    this.deleting = true;

    if(this.idVenue == 1 && this.currentSeasonID <= 3) {
      this.eventService.deleteTimesheetinDB(this.timesheet.idtimesheet).subscribe(res => {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close('delete');
              });
            });
          });
        });
      });
    }

    else if(this.idVenue == 1 && this.currentSeasonID >= 4) {
      this.eventService.deleteTimesheetinDB(this.timesheet.idtimesheet).subscribe(res => {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.eventService.setTimesheets(timesheets);
            this.event = this.mathService.calculatePncEvent2020(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close('delete');
              });
            });
          });
        });
      });
    }

    else if(this.idVenue == 2 && this.currentSeasonID <= 3) {
      this.eventService.deleteTimesheetinDB(this.timesheet.idtimesheet).subscribe(res => {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close('delete');
              });
            });
          });
        });
      });
    }

    else if(this.idVenue == 2 && this.currentSeasonID >= 4) {
      this.eventService.deleteTimesheetinDB(this.timesheet.idtimesheet).subscribe(res => {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent2020(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close('delete');
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
            this.eventService.editEvent(this.event, this.idVenue).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.activeModal.close('delete');
              });
            });
          });
        });
      });
    }
  }

}
