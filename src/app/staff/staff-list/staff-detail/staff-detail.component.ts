import { StaffService } from './../../staff.service';
import { Staff } from './../../../models/staff.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {
  // @Input() staff: Staff
  // staff: Staff;
  // id: number;

  constructor(private staffService: StaffService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.params
    // .subscribe(
    //   (params: Params) => {
    //     this.id = +params['id'];
    //     this.staff = this.staffService.getStaff(this.id);
    //   }
    // );
  }

}
