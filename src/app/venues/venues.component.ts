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
  // venues: Venue[] = [
  //   new Venue('PNC Arena', 'Home of the Hurricanes', 'Coordinator is Manit', 'S109', 'PNC'),
  //   new Venue('Walnut Creek Amphitheatre', 'Outdoor Concert Venue', 'Coordinator is Sarah', 'N.Pourhouse', 'WC'),
  //   new Venue('Carter-Finley Stadium', 'Home of the Wolfpack', 'Coordinator is Amy', 'B2', 'CF')
  
  // ];
  venueName: string = "PNC";
  currentVenue: Venue;
  

  constructor(private venueService: VenueService,
              private router: Router) {}

  ngOnInit() {
    const venuePath = this.router.url;
    this.venueService.setCurrentVenue(venuePath);
    this.currentVenue = this.venueService.getCurrentVenue();
    this.venueName = this.currentVenue.name;
  }


}
