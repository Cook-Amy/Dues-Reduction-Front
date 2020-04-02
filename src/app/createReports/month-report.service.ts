import { AuthService } from './../auth/auth.service';
import { GlobalVariables } from './../shared/GlobalVariables';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthReportService {
  serverUrl = GlobalVariables.serverUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getMonthReportData(startDate, endDate, email1, email2, download) {
    var userID = this.auth.getCurrentUser().userID;
    var userName = this.auth.getCurrentUser().firstName + " " + this.auth.getCurrentUser().lastName;
    var params = {startDate: startDate, endDate: endDate, email1: email1, email2: email2, download: download, userID: userID, userName: userName};
    var getData = this.http.post(this.serverUrl + 'getMonthReportData', params, {responseType: 'blob'});
    return getData;
  }
}
