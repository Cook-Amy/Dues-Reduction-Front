
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from '../models/staff.model';
import { StaffService } from '../staff/staff.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private staffService: StaffService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getAllStaff();
   }

   getAllStaff() {
    this.staffService.getAllStaff().subscribe(allStaff => {
      var formattedStaff: Staff[] = this.staffService.formatAllStaffResults(allStaff);
      this.staffService.setAllStaff(formattedStaff);
      this.setAllStaff(formattedStaff);
      this.staffService.getAllTuAccounts().subscribe(tuAccounts => {
        this.staffService.setAllTuAccounts(tuAccounts);
      });
    });
  }

  setAllStaff(allStaff) {
    this.staffService.setAllStaffOther(allStaff);
    this.staffService.setAllPncStaff(allStaff);
    this.staffService.setAllWcStaff(allStaff);
    this.staffService.setAllCfStaff(allStaff);
  }
  
}
