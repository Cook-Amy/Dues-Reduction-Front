import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from './../shared/GlobalVariables';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditSummaryService {
  serverUrl = GlobalVariables.serverUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  generateCreditSummary(specs) {
    var userID = this.auth.getCurrentUser().userID;
    var userName = this.auth.getCurrentUser().firstName + " " + this.auth.getCurrentUser().lastName;
    const params = {specs: specs, userID: userID, userName: userName};
    const generateSummary = this.http.post(this.serverUrl + "generateCreditSummary", params, {responseType: 'blob'});
    return generateSummary;
  }
}


