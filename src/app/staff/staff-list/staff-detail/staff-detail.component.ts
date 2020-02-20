import { StaffService } from './../../staff.service';
import { Staff } from './../../../models/staff.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {
  @Input() staff: Staff;
  @Input() staff2: Staff;
  @Input() staff3: Staff;
  @Input() currentVenueID: number;

  constructor(private staffService: StaffService, private route: ActivatedRoute) { }

  ngOnInit() { }

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
    
  }
}
