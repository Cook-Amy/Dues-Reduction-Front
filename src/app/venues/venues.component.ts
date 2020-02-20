import { VenueService } from './venue.service';
import { Component, OnInit } from '@angular/core';
import { Venue } from '../models/venue.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {
  // public venues: Venue[];
  venueName: string;
  currentVenue: Venue;
  

  constructor(private venueService: VenueService,
              private router: Router) {}

  ngOnInit() {
    const venuePath: string = this.router.url;
    // console.log("venue path: " + venuePath);
    this.getCurrentVenue(venuePath);
  }

  getCurrentVenue(venuePath) {
    if(this.venueService.getVenuesLength() < 1) {
      this.venueService.getAllVenues().subscribe(venues => {
        this.venueService.setVenues(venues);
        this.venueService.setCurrentVenue(venuePath);
        this.currentVenue = this.venueService.getCurrentVenue();
        // console.log("current venue: " + this.currentVenue.idvenue);
        this.venueName = this.currentVenue.name;
      })
    }
    else {
      // console.log("already have venues saved.");
      this.venueService.setCurrentVenue(venuePath);
      this.currentVenue = this.venueService.getCurrentVenue();
      // console.log("current venue 2: " + this.currentVenue.idvenue);
      this.venueName = this.currentVenue.name;
    }
  }

}
