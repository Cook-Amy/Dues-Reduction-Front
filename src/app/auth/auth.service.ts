import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = 'http://localhost:4000/';
  // serverUrl = 'http://duesbackend-env-1.b6qgyzs5az.us-east-2.elasticbeanstalk.com/';

  constructor(private http: HttpClient) {}

  getUser(email: string, password: string) {
    const authData = {email: email, password: password};
    const authReturned = this.http.post(this.serverUrl + 'login', authData);
    // console.log("authReturned: " + authReturned);
    return authReturned;
  }
}