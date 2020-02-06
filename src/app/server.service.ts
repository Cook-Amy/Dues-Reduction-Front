import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Venue } from './models/venue.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  serverUrl = 'http://localhost:4000/';
  // serverUrl = 'http://duesbackend-env-1.b6qgyzs5az.us-east-2.elasticbeanstalk.com/';

  venueSelected = new EventEmitter<Venue>();
  venues;

  constructor(private http: HttpClient) { }

  getVenues() {
    this.venues = this.http.get(this.serverUrl + 'venues');
    console.log('getVenues returned: ' + this.venues[0]);
    return this.venues;
  }

  getOneVenue(id: number) {
    // console.log('passed id: ' + id);
    // var newId = id.toString();
    // const params = new HttpParams({fromString: newId});
    // console.log("getOneVenue id: " + id);
    var data = {id: id};
    return this.http.post(this.serverUrl + 'oneVenue', data);
  }

}
