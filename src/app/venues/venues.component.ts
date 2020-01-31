import { Component, OnInit } from '@angular/core';
import { ServerService } from './../server.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {

  

  constructor(private server: ServerService) {}

  ngOnInit() {}
}
