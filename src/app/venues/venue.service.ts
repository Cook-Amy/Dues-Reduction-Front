import { Venue } from '../venue.model';
import { EventEmitter } from '@angular/core';


export class VenueService {
  venueSelected = new EventEmitter<Venue>();

  private venues: Venue[] = [
    new Venue('PNC Arena', 'Home of the Hurricanes', 'Coordinator is Manit', 'S109', 'PNC'),
    new Venue('Walnut Creek Amphitheatre', 'Outdoor Concert Venue', 'Coordinator is Sarah', 'N.Pourhouse', 'WC'),
    new Venue('Carter-Finley Stadium', 'Home of the Wolfpack', 'Coordinator is Amy', 'B2', 'CF')
  ];

  getVenues() {
    return this.venues.slice();
  }
}