import { StaffService } from './../../staff.service';
import { Staff } from './../../../models/staff.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {
  @Input() staff: Staff;
  @Input() currentVenueID: number;
  @Input() showVenue: number;

  staffEdit: Boolean;

  constructor(private staffService: StaffService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.staffEdit = this.staffService.getstaffEdit();
    this.staffService.staffEditChanged.subscribe(editChanged => {
      this.staffEdit = editChanged;
    });
   }

  getDate(date) {
    if(date == null) {
      return "---";
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

  checkForNullString(string) {
    if(string == null)
      return '0';
    else  
      return string;
  }

  checkForNullNum(num) {
    if(num == null)
      return 0;
    else  
      return num;
  }

  onEditStaff() {
    this.staffEdit = true;
  }

  onChangeStatus() {
    
  }
}
