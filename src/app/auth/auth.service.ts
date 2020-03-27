import { GlobalVariables } from './../shared/GlobalVariables';
import { Router } from '@angular/router';
import { SiteUser } from './../models/siteUser.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // serverUrl = 'http://localhost:4000/';
  // serverUrl = 'http://duesbackend-env-1.b6qgyzs5az.us-east-2.elasticbeanstalk.com/';
  serverUrl = GlobalVariables.serverUrl;

  authenticated = new BehaviorSubject(false);
  private currentUser: SiteUser;

  constructor(private http: HttpClient, private router: Router, private global: GlobalVariables) {}

  getUser(email: string, password: string) {
    const authData = {email: email, password: password};
    const authReturned = this.http.post<{token: string, user: SiteUser}>(this.serverUrl + 'login', authData);
    // console.log("authReturned: " + authReturned);
    return authReturned;
  }

  saveUser(token: string, user: SiteUser) {
    this.currentUser = user;
    localStorage.setItem('token', token);
    localStorage.setItem('userName', user.userName);

  }

  onLogout() {
    this.authenticated.next(false);
    this.currentUser = this.clearUser();
    localStorage.clear();
    this.router.navigate(['']);
  }

  returnUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('userName');
    if(!token) {
      return;
    }
    return {
      currentUser: this.currentUser,
      token: token,
      username: username
    };
  }

  clearUser() {
    const clearUser = new SiteUser(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    )
    return clearUser;
  }

  autoAuthUser() {
    const authinfo = this.returnUser();
    if(!authinfo) {
      return false;
    }
    var token = authinfo.token;
    this.authenticated.next(true);
    return true;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  changeCurrentUserSettings(user: SiteUser) {
    this.currentUser = user;
  }
}