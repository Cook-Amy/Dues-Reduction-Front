import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Timesheet } from './../../../../models/timesheet.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-edit-line',
  templateUrl: './single-edit-line.component.html',
  styleUrls: ['./single-edit-line.component.css']
})
export class SingleEditLineComponent implements OnInit {
  @Input() person: Timesheet;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {}


}
