import { GlobalVariables } from './../shared/GlobalVariables';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthReportService {
  serverUrl = GlobalVariables.serverUrl;

  constructor(private http: HttpClient) { }

  getMonthReportData(startDate, endDate) {
    var params = {startDate: startDate, endDate: endDate};
    var getData = this.http.post(this.serverUrl + 'getMonthReportData', params);
    return getData;
  }
}
