import { Subject } from 'rxjs';
import { Venue } from './../models/venue.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  serverUrl = 'http://localhost:4000/';
  // serverUrl = 'http://duesbackend-env-1.b6qgyzs5az.us-east-2.elasticbeanstalk.com/';

  venuesChanged = new Subject<Venue[]>();
  private venues: Venue[] = [];
  private currentVenue: Venue;

  constructor(private http: HttpClient) { }

  getAllVenues() {
    return this.http.get<Venue[]>(this.serverUrl + 'venues');
  }

  getVenuesLength() {
    return this.venues.length;
  }

  setVenues(venues: Venue[]) {
    this.venues = venues;
    this.venuesChanged.next(this.venues.slice());
  }

  getOneVenue(index: number) {
    return this.venues[index];
  }

  // path name should be the same as venue short name
  setCurrentVenue(currentVenue: string) {
    const newVenue = currentVenue.split('/', 2);
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
