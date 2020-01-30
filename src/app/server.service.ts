import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  // serverUrl = 'http://localhost:4000/';
  serverUrl = 'http://duesbackend-env-1.b6qgyzs5az.us-east-2.elasticbeanstalk.com/';

  constructor(private http: HttpClient) { }

  getVenues() {
    return this.http.get(this.serverUrl + 'venues');
  }

}
