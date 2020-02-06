import { Staff } from './../../../models/staff.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-staff-item',
  templateUrl: './staff-item.component.html',
  styleUrls: ['./staff-item.component.css']
})
export class StaffItemComponent implements OnInit {
  @Input() staff: Staff;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
