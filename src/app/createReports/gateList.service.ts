import { Staff } from '../models/staff.model';
import { Event } from '../models/event.model';
import { GlobalVariables } from '../shared/GlobalVariables';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class GateListService {

  serverUrl = GlobalVariables.serverUrl;

  workbook = new Workbook();
  data = [];

  constructor(private http: HttpClient) { }


  // Email gate list
  getStaffForEvent(eventID: number) {
    const params = new HttpParams().set('eventID', eventID.toString());
    const sendGateList = this.http.get<Staff[]>(this.serverUrl + 'getStaffForEvent', {params})
    return sendGateList;
  }

  generatePncGateList(event: Event, staff: Staff[], email: boolean, download: boolean) {
    const params = { event: event, staff: staff, email: email, download: download };
    const generateGateList = this.http.post(this.serverUrl + 'sendPncGateList', params, {responseType: 'blob'});
    return generateGateList;

  }

  generateWcGateList(event: Event, staff: Staff[], email: boolean, download: boolean) {
    const params = { event: event, staff: staff, email: email, download: download };
    const generateGateList = this.http.post(this.serverUrl + 'sendWcGateList', params, {responseType: 'blob'});
    return generateGateList;

  }
}
