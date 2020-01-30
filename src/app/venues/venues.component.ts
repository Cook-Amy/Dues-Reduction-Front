import { Component, OnInit } from '@angular/core';
import { ServerService } from './../server.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {

  venues: any = [];
  // modalCallback: () => void;

  constructor(private server: ServerService) {}

  ngOnInit() {
    this.server.getVenues().subscribe(data => {
      this.venues = data;
    })
  }
}
