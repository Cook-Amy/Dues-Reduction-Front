import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carter-finley',
  templateUrl: './carter-finley.component.html',
  styleUrls: ['./carter-finley.component.css']
})
export class CarterFinleyComponent implements OnInit {

  venueId = 3;

  constructor(private server: ServerService) {}

  ngOnInit() {}

}
