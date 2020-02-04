import { Component, OnInit } from '@angular/core';
import { ServerService } from './../server.service';
import { VenueService } from './venue.service';
import { Venue } from '../venue.model';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css'],
  providers: [VenueService]
})
export class VenuesComponent implements OnInit {
  venues: Venue[];
  venueName: string;
  

  constructor(private venueService: VenueService) {}

  ngOnInit() {
    this.venues = this.venueService.getVenues();
    console.log('venues: ' + this.venues[0].shortName);
    this.venueName = this.venues[0].name;
  }
}
