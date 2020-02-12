import { Component, OnInit } from '@angular/core';
import { VenueService } from './venue.service';
import { Venue } from '../models/venue.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css'],
  providers: [VenueService]
})
export class VenuesComponent implements OnInit {

  venueName: string = "PNC";
  currentVenue: Venue;
  

  constructor(private venueService: VenueService,
              private router: Router) {}

  ngOnInit() {
    const gettingVenues = this.venueService.getVenues();
    console.log('gettingVenues returned with : ' + gettingVenues);
    const venuePath = this.router.url;
    this.venueService.setCurrentVenue(venuePath);
    this.currentVenue = this.venueService.getCurrentVenue();
    this.venueName = this.currentVenue.name;
  }


}
