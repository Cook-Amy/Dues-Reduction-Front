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

  // TU Accounts
  private allTuAccounts: any[] = [];
  allTuAccountsChanged = new Subject<any[]>();

  constructor(private http: HttpClient) {}

  sortByNameAscending(staff: Staff[]) {
    return staff.sort((val1, val2) => {
      return (<any>val1.lastName > <any>val2.lastName) ? 1 : -1;
    });
  }

  sortAnyByNameAscending(arr: any[]) {
    return arr.sort((val1, val2) => {
      return (<any>val1.accountName > <any>val2.accountName) ? 1: -1;
    });
  }

  /*********************************************************************************
   * All Venue STAFF
  *********************************************************************************/
  // Get all staff
  getAllStaff() {
    const staffReturned = this.http.get<any[]>(this.serverUrl + 'getAllStaff');
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

  formatAllStaffResults(allStaff) {
    var staff: Staff[] = [];

    var staffResult = allStaff['staffResult'];
    var trainingResult = allStaff['trainingResult'];

    // create new staff with staffResults
    for(var i = 0; i < staffResult.length; i++) {
      var newStaff = new Staff(
        staffResult[i].idperson,
        staffResult[i].firstName, 
        staffResult[i].lastName,
        staffResult[i].Name,
        staffResult[i].Email,
        staffResult[i].Phone,
        staffResult[i].tuAccount,
        staffResult[i].pncActive,
        staffResult[i].pncInactive,
        staffResult[i].pncInterested,
        staffResult[i].wcActive,
        staffResult[i].wcInactive,
        staffResult[i].wcInterested,
        staffResult[i].cfActive,
        staffResult[i].cfInactive,
        staffResult[i].cfInterested,
        staffResult[i].pncHealthForm,
        staffResult[i].pncExperienced,
        staffResult[i].pncBars,
        staffResult[i].pncBarsRefresher,
        staffResult[i].pncWaiver,
        false,
        false,
        false,
        false,
        false,
        false,
        staffResult[i].wcTeamTraining,
        false,
        false,
        false,
        false,
        false,
        staffResult[i].cfAlcoholTraining,
        false,
        false,
        false
      );
      staff.push(newStaff);
    }

    // check if training is returned for each staff
    for(var j = 0; j < staff.length; j++) {
      for(var m = 0; m < trainingResult.length; m++) {
        if(trainingResult[m].personID == staff[j].idperson) {
          switch(trainingResult[m].idjobs) {
            case 1: staff[j].wcStandLeader = true; break;
            case 2: staff[j].wcMoveStockOut = true; break;
            case 4: staff[j].pncStandLeader = true; break;
            case 6: staff[j].pncGroupLeader = true; break;
            case 7: staff[j].pncHeadCook = true; break;
            case 8: staff[j].pncRegister = true; break;
            case 9: staff[j].wcFinalStandPrep = true; break;
            case 10: staff[j].wcSales = true; break;
            case 11: staff[j].pncAssistantCook = true; break;
            case 12: staff[j].wcContainerBarLead = true; break;
            case 13: staff[j].cfLeader = true; break;
            case 14: staff[j].cfStaff = true; break;
            case 15: staff[j].pncBeerCart = true; break;
            case 19: staff[j].cfAssistantLeader = true; break;
          }
        }
      }
    }

    return staff;
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
    var temp: Staff[] = [];
    var temp2: Staff[] = [];
    var temp3: Staff[] = [];
    staff.forEach(st => {
      if(st.pncActive == true && st.wcActive == true && st.cfActive == true) 
        temp.push(st);
      if(st.pncInactive == true && st.wcInactive == true && st.cfInactive == true)
        temp2.push(st);
      if(st.pncInterested == true && st.wcInterested == true && st.cfInterested == true)
        temp3.push(st);
    });
    this.setActiveStaff(temp);
    this.setInactiveStaff(temp2);
    this.setInterestedStaff(temp3);
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
  * TU Accounts
  *********************************************************************************/
  getAllTuAccounts() {
    const getAccounts = this.http.get<any[]>(this.serverUrl + 'getAllTuAccounts');
    return getAccounts;
  }

  setAllTuAccounts(tuAccounts: any[]) {
    this.allTuAccounts = this.sortAnyByNameAscending(tuAccounts);
    this.allTuAccountsChanged.next(this.allTuAccounts);
  }

  returnAllTuAccounts() {
    return this.allTuAccounts.slice();
  }

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

