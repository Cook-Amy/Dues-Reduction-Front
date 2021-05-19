import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from 'src/app/email/email.service';
import { EventService } from 'src/app/events/event.service';
import { Event } from 'src/app/models/event.model';
import { Season } from 'src/app/models/season.model';

@Component({
  selector: 'app-send-event-reminder',
  templateUrl: './send-event-reminder.component.html',
  styleUrls: ['./send-event-reminder.component.css']
})
export class SendEventReminderComponent implements OnInit {
  @Input() event: Event;
  @Input() currentVenueID: number;
  @Input() currentSeasonID: number;
  @Input() checklist: any[] = [];

  modalOptions: NgbModalOptions;
  checkedList: any[];
  masterSelected: boolean; 
  currentSeason: Season;
  emailTextForm: FormGroup;

  constructor(private eventService: EventService,
    private emailService: EmailService,
    private toastr: ToastrService,
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

    this.masterSelected = false;
    this.initForm();
  }

  private initForm() {
    let emailText = '';
    let removeReminderText = false;

    this.emailTextForm = new FormGroup({
      'emailText': new FormControl(emailText, Validators.required),
      'removeReminderText' : new FormControl(removeReminderText, Validators.required)
    });
  }

  onSubmitReminder() {
    // TODO: log last reminder date

    this.getCheckedItemList();
    var list = this.checkedList;

    var removeReminderText = this.emailTextForm.value['removeReminderText'];
    var emailText = this.emailTextForm.value['emailText'];

    if(this.currentVenueID == 1) {
      this.emailService.sendPncReminderEmail(list, removeReminderText, emailText, this.event.idevent).subscribe(res => {
          this.toastr.success("Event reminder was emailed.", "SUCCESS!", {
            closeButton: true,
            timeOut: 3000
          });
        this.eventService.getAllEvents().subscribe(events => {
          this.eventService.setAllEvents(events);
          this.eventService.setEventStaffEdit(false);
          this.activeModal.close("reminder sent");
        });
      });
    }

    else if(this.currentVenueID == 2) {
      this.emailService.sendWcReminderEmail(list, removeReminderText, emailText, this.event.idevent).subscribe(res => {
        this.toastr.success("Event reminder was emailed.", "SUCCESS!", {
          closeButton: true,
          timeOut: 3000
        });
        this.eventService.getAllEvents().subscribe(events => {
          this.eventService.setAllEvents(events);
          this.eventService.setEventStaffEdit(false);
          this.activeModal.close("reminder sent");
        });
      });
    }

    else if(this.currentVenueID == 3) {
      this.emailService.sendCfReminderEmail(list, removeReminderText, emailText, this.event.idevent).subscribe(res => {
        this.toastr.success("Event reminder was emailed.", "SUCCESS!", {
          closeButton: true,
          timeOut: 3000
        });
        this.eventService.getAllEvents().subscribe(events => {
          this.eventService.setAllEvents(events);
          this.eventService.setEventStaffEdit(false);
          this.activeModal.close("reminder sent");
        });
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

  getReminderDate(date) {
    if(date == null) {
      return "----";
    }
    else {
      var newDate: Date = new Date(date);
  
      if(newDate.getDate()) {
        var convertDate = (newDate.getMonth() + 1) + '-' + newDate.getDate() + '-' + newDate.getFullYear();
        return convertDate;
      } 
      else {
        return date;
      }
    }
  }

  checkForNullString(str) {
    if(str == null)
      return '0';
    else  
      return str;
  }

  checkForNullReminder(rm) {
    if(rm == null)
      return '----';
    else 
      return rm;
  }

}
