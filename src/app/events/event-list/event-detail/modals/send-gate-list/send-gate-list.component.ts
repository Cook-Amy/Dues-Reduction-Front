import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GateListService } from 'src/app/createReports/gateList.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-send-gate-list',
  templateUrl: './send-gate-list.component.html',
  styleUrls: ['./send-gate-list.component.css']
})
export class SendGateListComponent implements OnInit {
  @Input() event: Event;
  @Input() currentVenueID: number;

  modalOptions: NgbModalOptions;
  gateListForm: FormGroup;
  noStaffMsg = false;

  constructor(private gateListService: GateListService,
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

    this.initForm();
  }

  private initForm() {
    let emailGateList = true;
    let downloadGateList = false;
    
    this.gateListForm = new FormGroup({
      'emailGateList': new FormControl(emailGateList, Validators.required),
      'downloadGateList': new FormControl(downloadGateList, Validators.required)
    });
  }

  onGateListSubmit() {
    let email = this.gateListForm.value['emailGateList'];
    let download = this.gateListForm.value['downloadGateList'];

    if(email || download) {
      this.gateListService.getStaffForEvent(this.event.idevent).subscribe(staff => {
        if(!staff) {
          this.noStaffMsg = true;
        }
        else {
          this.noStaffMsg = false;
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
              this.activeModal.close('gate list sent');
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
             this.activeModal.close("gate list sent");
             });
          }
        }
    });
    }
  }

}
