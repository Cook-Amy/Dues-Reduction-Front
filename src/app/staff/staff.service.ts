import { GlobalVariables } from './../shared/GlobalVariables';
import { HttpClient } from '@angular/common/http';
import { Staff } from './../models/staff.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  serverUrl = GlobalVariables.serverUrl;

  private staffNew = false;
  staffNewChanged = new Subject<boolean>();
  private staffEdit = false;
  staffEditChanged = new Subject<boolean>();

// All venue staff
  private allStaff: Staff[] = [];
  private activeStaff: Staff[] = [];
  private inactiveStaff: Staff[] = [];
  private interestedStaff: Staff[] = [];
  allStaffChanged = new Subject<Staff[]>();
  activeStaffChanged = new Subject<Staff[]>();
  inactiveStaffChanged = new Subject<Staff[]>();
  interestedStaffChanged = new Subject<Staff[]>();

  // PNC staff
  private allPncStaff: Staff[] = [];
  private activePncStaff: Staff[] = [];
  private inactivePncStaff: Staff[] = [];
  private interestedPncStaff: Staff[] = [];
  allPncStaffChanged = new Subject<Staff[]>();
  activePncStaffChanged = new Subject<Staff[]>();
  inactivePncStaffChanged = new Subject<Staff[]>();
  interestedPncStaffChanged = new Subject<Staff[]>();

  // WC Staff
  private allWcStaff: Staff[] = [];
  private activeWcStaff: Staff[] = [];
  private inactiveWcStaff: Staff[] = [];
  private interestedWcStaff: Staff[] = [];
  allWcStaffChanged = new Subject<Staff[]>();
  activeWcStaffChanged = new Subject<Staff[]>();
  inactiveWcStaffChanged = new Subject<Staff[]>();
  interestedWcStaffChanged = new Subject<Staff[]>();

  // CF Staff
  private allCfStaff: Staff[] = [];
  private activeCfStaff: Staff[] = [];
  private inactiveCfStaff: Staff[] = [];
  private interestedCfStaff: Staff[] = [];
  allCfStaffChanged = new Subject<Staff[]>();
  activeCfStaffChanged = new Subject<Staff[]>();
  inactiveCfStaffChanged = new Subject<Staff[]>();
  interestedCfStaffChanged = new Subject<Staff[]>();

  constructor(private http: HttpClient, private global: GlobalVariables) {}

  sortByNameAscending(staff: Staff[]) {
    return staff.sort((val1, val2) => {
      return (<any>val1.lastName > <any>val2.lastName) ? 1 : -1;
    });
  }

  /*********************************************************************************
   * All Venue STAFF
  *********************************************************************************/
  // Get all staff
  getAllStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getAllStaff');
    return staffReturned;
  }

  getActiveStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getActiveStaff');
    return staffReturned;
  }

  getInactiveStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getInactiveStaff');
    return staffReturned;
  }

  getInterestedStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getInterestedStaff');
    return staffReturned;
  }

  setAllStaff(staff: Staff[]) {
    this.allStaff = this.sortByNameAscending(staff);
    this.setAllStaffOther(staff);
    if(staff == null) {

    }
    else {
      this.allStaffChanged.next(this.allStaff.slice());
    }
  }

  setAllStaffOther(staff: Staff[]) {
    this.setActiveStaff(staff);
    this.setInactiveStaff(staff);
    this.setInterestedStaff(staff);
  }

  setActiveStaff(staff: Staff[]) {
    this.activeStaff = this.sortByNameAscending(staff);
  }

  setInactiveStaff(staff: Staff[]) {
    this.inactiveStaff = this.sortByNameAscending(staff);
  }

  setInterestedStaff(staff: Staff[]) {
    this.interestedStaff = this.sortByNameAscending(staff);
  }

  returnAllStaff() { return this.allStaff.slice(); }
  returnActiveStaff() { return this.activeStaff.slice(); }
  returnInactiveStaff() { return this.inactiveStaff.slice(); }
  returnInterestedStaff() { return this.interestedStaff.slice(); }

  addNewStaff(staff: Staff) {
    this.allStaff.push(staff);
    this.allStaffChanged.next(this.allStaff.slice());
  }

  addNewStaffToDB(staff: Staff) {
    const params = {staff: staff};
    const addStaff = this.http.post<number>(this.serverUrl + 'addNewStaff', params);
    return addStaff;
  }

  updateStaffInDB(staff: Staff) {
    const params = {staff: staff};
    const updateStaff = this.http.post(this.serverUrl + "updateStaff", params);
    return updateStaff;
  }

  removeStaffInDB(staff: Staff) {
    const params = {staff: staff};
    const removeStaff = this.http.post(this.serverUrl + "removeStaff", params);
    return removeStaff;
  }

  /*********************************************************************************
   * PNC STAFF
  *********************************************************************************/
  // Get all staff
  getAllPncStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getAllPncStaff');
    return staffReturned;
  }

  getActivePncStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getActivePncStaff');
    return staffReturned;
  }

  getInactivePncStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getInactivePncStaff');
    return staffReturned;
  }

  getInterestedPncStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getInterestedPncStaff');
    return staffReturned;
  }

  setAllPncStaff(staff: Staff[]) {
    this.allPncStaff = this.sortByNameAscending(staff);
    var temp: Staff[] = [];
    var temp2: Staff[] = [];
    var temp3: Staff[] = [];
    staff.forEach(st => {
      if(st.pncActive == true) 
        temp.push(st);
      if(st.pncInactive == true)
        temp2.push(st);
      if(st.pncInterested == true)
        temp3.push(st);
    });
    this.setActivePncStaff(temp);
    this.setInactivePncStaff(temp2);
    this.setInterestedPncStaff(temp3);
    
    if(staff == null) {

    }
    else {
      // this.allPncStaffChanged.next(this.allPncStaff.slice());
    }
  }

  setActivePncStaff(staff: Staff[]) {
    this.activePncStaff = this.sortByNameAscending(staff);
    if(staff == null) {

    }
    else {
      // this.activePncStaffChanged.next(this.activePncStaff.slice());
    }
  }

  setInactivePncStaff(staff: Staff[]) {
    this.inactivePncStaff = this.sortByNameAscending(staff);
    if(staff == null) {

    }
    else {
      // this.inactivePncStaffChanged.next(this.inactivePncStaff.slice());
    }
  }

  setInterestedPncStaff(staff: Staff[]) {
    this.interestedPncStaff = this.sortByNameAscending(staff);
    if(staff == null) {

    }
    else {
      // this.interestedPncStaffChanged.next(this.interestedPncStaff.slice());
    }
  }

  returnAllPncStaff() { return this.allPncStaff.slice(); }
  returnActivePncStaff() { return this.activePncStaff.slice(); }
  returnInactivePncStaff() { return this.inactivePncStaff.slice(); }
  returnInterestedPncStaff() { return this.interestedPncStaff.slice(); }

  addNewPncStaff(staff: Staff) {
    this.allPncStaff.push(staff);
    this.allPncStaffChanged.next(this.allPncStaff.slice());
  }

  /*********************************************************************************
   * WC STAFF
  *********************************************************************************/
  // Get all staff
  getAllWcStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getAllWcStaff');
    return staffReturned;
  }

  getActiveWcStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getActiveWcStaff');
    return staffReturned;
  }

  getInactiveWcStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getInactiveWcStaff');
    return staffReturned;
  }

  getInterestedWcStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getInterestedWcStaff');
    return staffReturned;
  }

  setAllWcStaff(staff: Staff[]) {
    this.allWcStaff = this.sortByNameAscending(staff);
    var temp: Staff[] = [];
    var temp2: Staff[] = [];
    var temp3: Staff[] = [];
    staff.forEach(st => {
      if(st.wcActive == true) 
        temp.push(st);
      if(st.wcInactive == true)
        temp2.push(st);
      if(st.wcInterested == true)
        temp3.push(st);
    });
    this.setActiveWcStaff(temp);
    this.setInactiveWcStaff(temp2);
    this.setInterestedWcStaff(temp3);

    if(staff == null) {

    }
    else {
      // this.allWcStaffChanged.next(this.allWcStaff.slice());
    }
  }

  setActiveWcStaff(staff: Staff[]) {
    this.activeWcStaff = this.sortByNameAscending(staff);
    if(staff == null) {

    }
    else {
      // this.activeWcStaffChanged.next(this.activeWcStaff.slice());
    }
  }

  setInactiveWcStaff(staff: Staff[]) {
    this.inactiveWcStaff = this.sortByNameAscending(staff);
    if(staff == null) {

    }
    else {
      // this.inactiveWcStaffChanged.next(this.inactiveWcStaff.slice());
    }
  }

  setInterestedWcStaff(staff: Staff[]) {
    this.interestedWcStaff = this.sortByNameAscending(staff);
    if(staff == null) {

    }
    else {
      // this.interestedWcStaffChanged.next(this.interestedWcStaff.slice());
    }
  }

  returnAllWcStaff() { return this.allWcStaff.slice(); }
  returnActiveWcStaff() { return this.activeWcStaff.slice(); }
  returnInactiveWcStaff() { return this.inactiveWcStaff.slice(); }
  returnInterestedWcStaff() { return this.interestedWcStaff.slice(); }



  /*********************************************************************************
   * CF STAFF
  *********************************************************************************/
  // Get all staff
  getAllCfStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getAllCfStaff');
    return staffReturned;
  }

  getActiveCfStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getActiveCfStaff');
    return staffReturned;
  }

  getInactiveCfStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getInactiveCfStaff');
    return staffReturned;
  }

  getInterestedCfStaff() {
    const staffReturned = this.http.get<Staff[]>(this.serverUrl + 'getInterestedCfStaff');
    return staffReturned;
  }

  setAllCfStaff(staff: Staff[]) {
    this.allCfStaff = this.sortByNameAscending(staff);
    var temp: Staff[] = [];
    var temp2: Staff[] = [];
    var temp3: Staff[] = [];
    staff.forEach(st => {
      if(st.cfActive == true) 
        temp.push(st);
      if(st.cfInactive == true)
        temp2.push(st);
      if(st.cfInterested == true)
        temp3.push(st);
    });
    this.setActiveCfStaff(temp);
    this.setInactiveCfStaff(temp2);
    this.setInterestedCfStaff(temp3);

    if(staff == null) {

    }
    else {
      // this.allCfStaffChanged.next(this.allCfStaff.slice());
    }
  }

  setActiveCfStaff(staff: Staff[]) {
    this.activeCfStaff = this.sortByNameAscending(staff);
    if(staff == null) {

    }
    else {
      // this.activeCfStaffChanged.next(this.activeCfStaff.slice());
    }
  }

  setInactiveCfStaff(staff: Staff[]) {
    this.inactiveCfStaff = this.sortByNameAscending(staff);
    if(staff == null) {

    }
    else {
      // this.inactiveCfStaffChanged.next(this.inactiveCfStaff.slice());
    }
  }

  setInterestedCfStaff(staff: Staff[]) {
    this.interestedCfStaff = this.sortByNameAscending(staff);
    if(staff == null) {

    }
    else {
      // this.interestedCfStaffChanged.next(this.interestedCfStaff.slice());
    }
  }

  returnAllCfStaff() { return this.allCfStaff.slice(); }
  returnActiveCfStaff() { return this.activeCfStaff.slice(); }
  returnInactiveCfStaff() { return this.inactiveCfStaff.slice(); }
  returnInterestedCfStaff() { return this.interestedCfStaff.slice(); }

  /*********************************************************************************
    * OTHER
  *********************************************************************************/
  getStaffNew() {
    return this.staffNew;
  }

  setstaffNew(staffNew: boolean) {
    this.staffNew = staffNew;
    this.staffNewChanged.next(this.staffNew);
  }

  getstaffEdit() {
    return this.staffEdit;
  }

  setstaffEdit(staffEdit: boolean) {
    this.staffEdit = staffEdit;
    this.staffEditChanged.next(this.staffEdit);
  }

}

