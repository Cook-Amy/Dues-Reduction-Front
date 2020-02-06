import { Venue } from '../models/venue.model';
import { EventEmitter } from '@angular/core';


export class VenueService {
  venueSelected = new EventEmitter<Venue>();
  currentVenue: Venue;


  private venues: Venue[] = [
    new Venue('PNC Arena', 'Home of the Hurricanes', 'Coordinator is Manit', 'S109', 'PNC'),
    new Venue('Walnut Creek Amphitheatre', 'Outdoor Concert Venue', 'Coordinator is Sarah', 'N.Pourhouse', 'WC'),
    new Venue('Carter-Finley Stadium', 'Home of the Wolfpack', 'Coordinator is Amy', 'B2', 'CF')
  ];

  getVenues() {
    return this.venues.slice();
  }

  // path name should be the same as venue short name
  setCurrentVenue(venue) {
    const newVenue = venue.split('/', 2);
    for(var i = 0; i < this.venues.length; i++) {
      var checkName = this.venues[i].shortName.toLowerCase();
      if(checkName.includes(newVenue[1])){
        this.currentVenue = this.venues[i];
      }
    }
  }

  getCurrentVenue() {
    return this.currentVenue;
  }
}