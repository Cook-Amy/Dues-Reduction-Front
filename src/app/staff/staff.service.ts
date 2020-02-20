import { HttpClient } from '@angular/common/http';
import { Staff } from './../models/staff.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  
//   serverUrl = 'http://localhost:4000/';
//   // serverUrl = 'http://duesbackend-env-1.b6qgyzs5az.us-east-2.elasticbeanstalk.com/';

// // All venue staff
//   private allStaff: Staff[] = [];
//   private activeStaff: Staff[] = [];
//   private inactiveStaff: Staff[] = [];
//   private interestedStaff: Staff[] = [];
//   allStaffChanged = new Subject<Staff[]>();
//   activeStaffChanged = new Subject<Staff[]>();
//   inactiveStaffChanged = new Subject<Staff[]>();
//   interestedStaffChanged = new Subject<Staff[]>();

//   // PNC staff
//   private allPncStaff: Staff[] = [];
//   private activePncStaff: Staff[] = [];
//   private inactivePncStaff: Staff[] = [];
//   private interestedPncStaff: Staff[] = [];
//   allPncStaffChanged = new Subject<Staff[]>();
//   activePncStaffChanged = new Subject<Staff[]>();
//   inactivePncStaffChanged = new Subject<Staff[]>();
//   interestedPncStaffChanged = new Subject<Staff[]>();

//   // WC Staff
//   private allWcStaff: Staff[] = [];
//   private activeWcStaff: Staff[] = [];
//   private inactiveWcStaff: Staff[] = [];
//   private interestedWcStaff: Staff[] = [];
//   allWcStaffChanged = new Subject<Staff[]>();
//   activeWcStaffChanged = new Subject<Staff[]>();
//   inactiveWcStaffChanged = new Subject<Staff[]>();
//   interestedWcStaffChanged = new Subject<Staff[]>();

//   // CF Staff
//   private allCfStaff: Staff[] = [];
//   private activeCfStaff: Staff[] = [];
//   private inactiveCfStaff: Staff[] = [];
//   private interestedCfStaff: Staff[] = [];
//   allCfStaffChanged = new Subject<Staff[]>();
//   activeCfStaffChanged = new Subject<Staff[]>();
//   inactiveCfStaffChanged = new Subject<Staff[]>();
//   interestedCfStaffChanged = new Subject<Staff[]>();

//   constructor(private http: HttpClient) {}


//   /*********************************************************************************
//    * All Venue STAFF
//   *********************************************************************************/
//   // Get all staff
//   getAllStaff() {
//     const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getAllStaff');
//     return staffReturned;
//   }

//   getActiveStaff() {
//     const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getActiveStaff');
//     return staffReturned;
//   }

//   getInactiveStaff() {
//     const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getInactiveStaff');
//     return staffReturned;
//   }

//   getInterestedStaff() {
//     const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getInterestedStaff');
//     return staffReturned;
//   }


}