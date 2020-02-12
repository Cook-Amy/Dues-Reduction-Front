import { Venue } from '../models/venue.model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  serverUrl = 'http://localhost:4000/';
  // serverUrl = 'http://duesbackend-env-1.b6qgyzs5az.us-east-2.elasticbeanstalk.com/';

  venueSelected = new EventEmitter<Venue>();
  currentVenue: Venue;

  venuesList;

  private venues: Venue[] = [
    new Venue('PNC Arena', 'Home of the Hurricanes', 'Coordinator is Manit', 'S109', 'PNC'),
    new Venue('Walnut Creek Amphitheatre', 'Outdoor Concert Venue', 'Coordinator is Sarah', 'N.Pourhouse', 'WC'),
    new Venue('Carter-Finley Stadium', 'Home of the Wolfpack', 'Coordinator is Amy', 'B2', 'CF')
  ];

  constructor(private http: HttpClient) { }

  getVenues() {
    console.log("getVenues called");
    // console.log("venues value #1: " + this.venues);
    this.venuesList = this.http.get(this.serverUrl + 'venues');
    console.log('getVenues returned: ' + this.venuesList[0]);
    return this.venuesList;
    // return this.venues.slice();
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