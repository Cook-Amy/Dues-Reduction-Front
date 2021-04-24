import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from './../shared/GlobalVariables';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  serverUrl = GlobalVariables.serverUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  sendPncReminderEmail(list: any[], emailText: string, eventID: number) {
    var userID = this.auth.getCurrentUser().userID;
    var userName = this.auth.getCurrentUser().firstName + " " + this.auth.getCurrentUser().lastName;
    var params = {
      list: list,
      emailText: emailText,
      eventID: eventID,
      userID: userID,
      userName: userName
    };
    var sendReminder = this.http.post(this.serverUrl + "sendPncReminderEmail", params);
    return sendReminder;
  }

  sendWcReminderEmail(list: any[], emailText: string, eventID: number) {
    var userID = this.auth.getCurrentUser().userID;
    var userName = this.auth.getCurrentUser().firstName + " " + this.auth.getCurrentUser().lastName;
    var params = {
      list: list,
      emailText: emailText,
      eventID: eventID,
      userID: userID,
      userName: userName
    };
    var sendReminder = this.http.post(this.serverUrl + "sendWcReminderEmail", params);
    return sendReminder;
  }

  sendCfReminderEmail(list: any[], emailText: string, eventID: number) {
    var userID = this.auth.getCurrentUser().userID;
    var userName = this.auth.getCurrentUser().firstName + " " + this.auth.getCurrentUser().lastName;
    var params = {
      list: list,
      emailText: emailText,
      eventID: eventID,
      userID: userID,
      userName: userName
    };
    var sendReminder = this.http.post(this.serverUrl + "sendCfReminderEmail", params);
    return sendReminder;
  }

}
