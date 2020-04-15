import { GlobalVariables } from './../shared/GlobalVariables';
import { HttpClient } from '@angular/common/http';
import { SiteUser } from './../models/siteUser.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  serverUrl = GlobalVariables.serverUrl;

  constructor(private http: HttpClient) { }

  changeSettings(user: SiteUser) {
    var params = {user: user};
    var changeSettings = this.http.post<{username: string}>(this.serverUrl + "changeSettings", params);
    return changeSettings;
  }
}
