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
  venueName: string;
  currentVenue: Venue;
  idVenue: number;
  

  constructor(private venueService: VenueService,
              private router: Router) {}

  ngOnInit() {
    const venuePath: string = this.router.url;
    this.getCurrentVenue(venuePath);
  }

  getCurrentVenue(venuePath) {
    if(venuePath == "/admin"){
      this.venueService.getAllVenues().subscribe(venues => {
        this.venueService.setVenues(venues);
        this.venueService.setAllVenue();
        this.currentVenue = this.venueService.getCurrentVenue();
        this.venueName = this.currentVenue.name;
        this.idVenue = this.currentVenue.idvenue;
        if(this.idVenue == null)
        {
          this.idVenue = 0;
        }
      })
      
    }
    else if(this.venueService.getVenuesLength() < 1) {
      this.venueService.getAllVenues().subscribe(venues => {
        this.venueService.setVenues(venues);
        this.venueService.setCurrentVenue(venuePath);
        this.currentVenue = this.venueService.getCurrentVenue();
        this.venueName = this.currentVenue.name;
        this.idVenue = this.currentVenue.idvenue;
        if(this.idVenue == null)
        {
          this.idVenue = 0;
        }
      })
    }
    else {
      this.venueService.setCurrentVenue(venuePath);
      this.currentVenue = this.venueService.getCurrentVenue();
      this.venueName = this.currentVenue.name;
    }
  }

}
