import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from './../shared/GlobalVariables';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditSummaryService {
  serverUrl = GlobalVariables.serverUrl;

  constructor(private http: HttpClient) { }

  generateCreditSummary(specs) {
    const params = {specs: specs};
    const generateSummary = this.http.post(this.serverUrl + "generateCreditSummary", params);
    return generateSummary;
  }
}
