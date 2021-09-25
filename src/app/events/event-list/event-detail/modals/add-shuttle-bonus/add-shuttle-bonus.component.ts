import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from 'src/app/events/event.service';
import { MathService } from 'src/app/events/math.service';
import { Season } from 'src/app/models/season.model';
import { Timesheet } from 'src/app/models/timesheet.model';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-add-shuttle-bonus',
  templateUrl: './add-shuttle-bonus.component.html',
  styleUrls: ['./add-shuttle-bonus.component.css']
})
export class AddShuttleBonusComponent implements OnInit {
  @Input() event: Event;
  @Input() currentSeasonID: number;
  @Input() currentVenueID: number;
  @Input() timesheet: Timesheet[] = [];

  modalOptions: NgbModalOptions;
  currentSeason: Season;
  sbForm: FormGroup;

  constructor(private eventService: EventService,
    private mathService: MathService,
    public activeModal: NgbActiveModal) {
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop',
        size: 'xl',
        centered: false
     } 
    }

  ngOnInit() {
    this.eventService.getSeasons().subscribe(res => {
      this.eventService.setSeasons(res);
      this.eventService.setCurrentSeasonById(this.currentSeasonID);
      this.currentSeason = this.eventService.getCurrentSeason();
    });

    this.initForm();
  }

  private initForm() {
    let sbAmount = 0;
    this.sbForm = new FormGroup({
      'sbAmount': new FormControl(sbAmount, Validators.required)
    });
  }

  onShuttleBonusAdded() {
    var sb = this.sbForm.value['sbAmount'];
    this.timesheet.forEach(ts => {
      ts.shuttleBonus += sb;
    });

    this.mathService.calculateTimeSheets(this.timesheet);
    this.eventService.setTimesheets(this.timesheet);
    this.eventService.updateAllTimesheetsInDB(this.timesheet).subscribe(res => {

      if(this.currentVenueID == 1 && this.currentSeasonID <= 3) {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                this.activeModal.close('delete');
              });
            });
          });
        });
      }

      else if(this.currentVenueID == 1 && this.currentSeasonID >= 4) {
        this.eventService.getPncContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculatePncEvent2020(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                this.activeModal.close('delete');
              });
            });
          });
        });
      }

      else if(this.currentVenueID == 2 && this.currentSeasonID <= 3) {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                this.activeModal.close('delete');
              });
            });
          });
        });
      }

      else if(this.currentVenueID == 2 && this.currentSeasonID >= 4) {
        this.eventService.getWcContractInfo().subscribe(contract => {
          this.eventService.getTimesheetForEvent(this.event.idevent).subscribe(timesheets => {
            this.event = this.mathService.calculateWcEvent2020(this.event, contract[0], timesheets);
            this.eventService.editEvent(this.event, this.currentVenueID).subscribe(res => {
              this.eventService.getAllEvents().subscribe(events => {
                this.eventService.setAllEvents(events);
                this.eventService.setEventStaffEdit(false);
                this.activeModal.close('delete');
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
                this.activeModal.close('delete');
              });
            });
          });
        });
      }
    });
  }
}
