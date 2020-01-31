import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-walnut-creek',
  templateUrl: './walnut-creek.component.html',
  styleUrls: ['./walnut-creek.component.css']
})
export class WalnutCreekComponent implements OnInit {

  venueId = 2;

  constructor(private server: ServerService) {}

  ngOnInit() {}

}
