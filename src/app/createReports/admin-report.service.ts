import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from './../shared/GlobalVariables';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminReportService {
  serverUrl = GlobalVariables.serverUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  generateAdminReport1(specs) {
    var userID = this.auth.getCurrentUser().userID;
    var userName = this.auth.getCurrentUser().firstName + " " + this.auth.getCurrentUser().lastName;
    const params = {specs: specs, userID: userID, userName: userName};
    const generateReport = this.http.post(this.serverUrl + "generateAdminReport1", params, {responseType: 'blob'});
    return generateReport;
  }
}
