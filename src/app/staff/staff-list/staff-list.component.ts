import { StaffService } from './../staff.service';
import { Staff } from './../../models/staff.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  allStaff: Staff[];

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.allStaff = this.staffService.getAllStaff();
    this.staffService.staffChanged
      .subscribe(
        (staff: Staff[]) => {
          this.allStaff = staff;
        }
      );
  }
}
