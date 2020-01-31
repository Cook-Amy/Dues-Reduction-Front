import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pnc',
  templateUrl: './pnc.component.html',
  styleUrls: ['./pnc.component.css']
})
export class PncComponent implements OnInit {

  venueId = 1;

  constructor(private server: ServerService) {}

  ngOnInit() {}

}
