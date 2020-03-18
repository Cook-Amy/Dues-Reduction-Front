import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from './../shared/GlobalVariables';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  serverUrl = GlobalVariables.serverUrl;

  constructor(private http: HttpClient) { }

  sendPncReminderEmail(list: any[], eventID: number) {
    var params = {
      list: list,
      eventID: eventID
    };
    var sendReminder = this.http.post(this.serverUrl + "sendPncReminderEmail", params);
    return sendReminder;
  }

  sendWcReminderEmail(list: any[], eventID: number) {
    var params = {
      list: list,
      eventID: eventID
    };
    var sendReminder = this.http.post(this.serverUrl + "sendWcReminderEmail", params);
    return sendReminder;
  }

  sendCfReminderEmail(list: any[], eventID: number) {
    var params = {
      list: list,
      eventID: eventID
    };
    var sendReminder = this.http.post(this.serverUrl + "sendCfReminderEmail", params);
    return sendReminder;
  }

}
