
import { Event } from './../models/event.model';
import { ContractCF } from './../models/contractCF.model';
import { ContractWC } from './../models/contractWC.model';
import { Job } from './../models/job.model';
import { GlobalVariables } from './../shared/GlobalVariables';
import { ContractPNC } from './../models/contractPNC.model';
import { Timesheet } from './../models/timesheet.model';
import { Season } from 'src/app/models/season.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  serverUrl = GlobalVariables.serverUrl;

  private eventNew = false;
  eventNewChanged = new Subject<boolean>();
  private eventEdit = false;
  eventEditChanged = new Subject<boolean>();

  private eventStaffEdit = false;
  eventStaffEditChanged = new Subject<boolean>();
  private eventStaffAdd = false;
  eventStaffAddChanged = new Subject<boolean>();


  private seasons: Season[] = [];
  private currentSeason: Season;

  // All venue events
  private eventsAll: Event[] = [];
  private eventsAllSortedByDateDescending: Event[] = [];
  private eventsAllSortedByDateAscending: Event[] = [];
  private eventsAllSortedByNameAscending: Event[] = [];
  private eventsAllSortedByNameDescending: Event[] = [];
  eventsAllChanged = new Subject<Event[]>();
  eventsAllSortedByDateDescendingChanged = new Subject<Event[]>();
  eventsAllSortedByDateAscendingChanged = new Subject<Event[]>();
  eventsAllSortedByNameAscendingChanged = new Subject<Event[]>();
  eventsAllSortedByNameDescendingChanged = new Subject<Event[]>();
  
  // PNC events
  eventsPncChanged = new Subject<Event[]>();
  private eventsPnc: Event[] = [];
  eventsPncSortedByDateDescendingChanged = new Subject<Event[]>();
  private eventsPncSortedByDateDescending: Event[] = [];
  eventsPncSortedByDateAscendingChanged = new Subject<Event[]>();
  private eventsPncSortedByDateAscending: Event[] = [];
  eventsPncSortedByNameAscendingChanged = new Subject<Event[]>();
  private eventsPncSortedByNameAscending: Event[] = [];
  eventsPncSortedByNameDescendingChanged = new Subject<Event[]>();
  private eventsPncSortedByNameDescending: Event[] = [];
  
  // WC events
  eventsWcChanged = new Subject<Event[]>();
  private eventsWc: Event[] = [];
  eventsWcSortedByDateDescendingChanged = new Subject<Event[]>();
  private eventsWcSortedByDateDescending: Event[] = [];
  eventsWcSortedByDateAscendingChanged = new Subject<Event[]>();
  private eventsWcSortedByDateAscending: Event[] = [];
  eventsWcSortedByNameAscendingChanged = new Subject<Event[]>();
  private eventsWcSortedByNameAscending: Event[] = [];
  eventsWcSortedByNameDescendingChanged = new Subject<Event[]>();
  private eventsWcSortedByNameDescending: Event[] = [];

  // CF events
  eventsCfChanged = new Subject<Event[]>();
  private eventsCf: Event[] = [];
  eventsCfSortedByDateDescendingChanged = new Subject<Event[]>();
  private eventsCfSortedByDateDescending: Event[] = [];
  eventsCfSortedByDateAscendingChanged = new Subject<Event[]>();
  private eventsCfSortedByDateAscending: Event[] = [];
  eventsCfSortedByNameAscendingChanged = new Subject<Event[]>();
  private eventsCfSortedByNameAscending: Event[] = [];
  eventsCfSortedByNameDescendingChanged = new Subject<Event[]>();
  private eventsCfSortedByNameDescending: Event[] = [];

  // Timesheets
  timesheets: Timesheet[] = [];
  timesheetsChanged = new Subject<Timesheet[]>();
  
  constructor(private http: HttpClient) {}

  sortByDateAscending(events: Event[]) {
    if(!events) { events = []; }
    return events.sort((val1, val2) => {
      return <any>new Date(val1.Date) - <any>new Date(val2.Date);
    });
  }

  fixEventNumbers(events: Event[]) {
    events.forEach(event => {
      if(event.venueBonus)
        event.venueBonus = parseFloat(event.venueBonus.toFixed(2));
      if(event.estimatedCheck)
        event.estimatedCheck = parseFloat(event.estimatedCheck.toFixed(2));
      if(event.estimatedProfit)
        event.estimatedProfit = parseFloat(event.estimatedProfit.toFixed(2));
      if(event.actualCheck)
        event.actualCheck = parseFloat(event.actualCheck.toFixed(2));
      if(event.payout)
        event.payout = parseFloat(event.payout.toFixed(2));
      if(event.discrepancy)
        event.discrepancy = parseFloat(event.discrepancy.toFixed(2));
      if(event.actualProfit)
        event.actualProfit = parseFloat(event.actualProfit.toFixed(2));
      if(event.tacCut)
        event.tacCut = parseFloat(event.tacCut.toFixed(2));
      if(event.drCut)
        event.drCut = parseFloat(event.drCut.toFixed(2));
      if(event.coordinatorAdminAmt)
        event.coordinatorAdminAmt = parseFloat(event.coordinatorAdminAmt.toFixed(2));
      if(event.totalSalesPnc)
        event.totalSalesPnc = parseFloat(event.totalSalesPnc.toFixed(2));
      if(event.totalSalesCf)
        event.totalSalesCf = parseFloat(event.totalSalesCf.toFixed(2));
      if(event.alcSales)
        event.alcSales = parseFloat(event.alcSales.toFixed(2));
      if(event.shuttleBonusAmountWc)
        event.shuttleBonusAmountWc = parseFloat(event.shuttleBonusAmountWc.toFixed(2));
      if(event.shuttleBonusAmountCf)
        event.shuttleBonusAmountCf = parseFloat(event.shuttleBonusAmountCf.toFixed(2));
      if(event.creditCardTips)
        event.creditCardTips = parseFloat(event.creditCardTips.toFixed(2));
      if(event.maxCreditCardTipAmount)
        event.maxCreditCardTipAmount = parseFloat(event.maxCreditCardTipAmount.toFixed(2));
    });

    return events;
  }

  /*********************************************************************************
   * All Venue EVENTS 
  *********************************************************************************/
  // Get all events for selected season
  getAllEvents() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
    const eventsReturned = this.http.get<Event[]>(this.serverUrl + 'getEvents', {params});
    return eventsReturned;
  }

  // Save events to object after they come from DB, according to sort chosen
  setAllEvents(events: Event[]) {
    this.eventsAll = this.sortByDateAscending(events);
    this.eventsAll = this.fixEventNumbers(this.eventsAll);

    this.setVenueEvents(this.eventsAll);
    if(events == null) {}
    else {
      this.eventsAllChanged.next(this.eventsAll.slice());
    }
  }

  setVenueEvents(events: Event[]) {
    var temp1: Event[] = [];
    var temp2: Event[] = [];
    var temp3: Event[] = [];

    events.forEach(event => {
      if(event.venueID == 1) {
        temp1.push(event);
      }
      else if(event.venueID == 2) {
        temp2.push(event);
      }
      else if(event.venueID == 3) {
        temp3.push(event);
      }
    });
    this.eventsPnc = temp1;
    this.eventsWc = temp2;
    this.eventsCf = temp3;
  }

  returnEventsAll() { return this.eventsAll.slice(); }
  returnEventsPnc() { return this.eventsPnc.slice(); }
  returnEventsWc() { return this.eventsWc.slice(); }
  returnEventsCf() { return this.eventsCf.slice(); }

  deleteEvent(event: Event) {
    var params = {eventID: event.idevent};
    var deleteEvent = this.http.post(this.serverUrl + "deleteEvent", params);
    return deleteEvent;
  }

  editEvent(event: Event, eventID: number) {
    const params = { event: event, eventID: eventID };

    const editEvent = this.http.post(this.serverUrl + 'editEvent', params);
    return editEvent;
  }

  setNewEvent(event: Event) {

      const params = {event: event};
      const eventSaved = this.http.post<number>(this.serverUrl + 'setNewEvent', params);
      return eventSaved;
  }
  

  /*********************************************************************************
   * PNC EVENTS 
  *********************************************************************************/
  
  getPncContractInfo() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
    const contractReturned = this.http.get<ContractPNC>(this.serverUrl + 'getContractPnc', {params});
    return contractReturned; 
  }

  getPncJobs() {
    const getJobs = this.http.get<Job[]>(this.serverUrl + 'getPncJobs');
    return getJobs;
  }

  /*********************************************************************************
  * WC EVENTS 
  *********************************************************************************/

  getWcContractInfo() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
    const contractReturned = this.http.get<ContractWC>(this.serverUrl + 'getContractWc', {params});
    return contractReturned; 
  }

  getWcJobs() {
    const getJobs = this.http.get<Job[]>(this.serverUrl + 'getWcJobs');
    return getJobs;
  }

  /*********************************************************************************
   * CF EVENTS 
  *********************************************************************************/
    
    getCfContractInfo() {
      const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
      const contractReturned = this.http.get<ContractCF>(this.serverUrl + 'getContractCf', {params});
      return contractReturned; 
    }
  
    getCfJobs() {
      const getJobs = this.http.get<Job[]>(this.serverUrl + 'getCfJobs');
      return getJobs;
    }

  /*********************************************************************************
   * SEASONS 
  *********************************************************************************/
 
  getSeasons() {
    const seasonsReturned = this.http.get<Season[]>(this.serverUrl + 'getSeasons');
    return seasonsReturned;
  }

  returnSeasons() {
    return this.seasons;
  }

  setSeasons(seasons: Season[]) {
    this.seasons = seasons;
  }

  setCurrentSeason(season: Season) {
    this.currentSeason = season;
  }

  setCurrentSeasonById(id: number) {
    for(var i = 0; i < this.seasons.length; i++) {
      if(this.seasons[i]['idSeason'] == id) {
        this.currentSeason = this.seasons[i];
      }
    }
    return this.currentSeason;
  }

  getCurrentSeason() {
    return this.currentSeason;
  }

  getOneSeason(index: number) {
    return this.seasons[index];
  }


  /*********************************************************************************
   * TIMESHEETS FOR EVENT
  *********************************************************************************/
  getTimesheetForEvent(eventID) {
    const params = new HttpParams().set('eventID', eventID);
    const timesheetsReturned = this.http.get<Timesheet[]>(this.serverUrl + 'getTimesheetForEvent', {params});
    return timesheetsReturned;
  }

  addToTimesheets(timesheet: Timesheet) {
    if(!this.timesheets) {
      this.timesheets = [];
    }
    this.timesheets.push(timesheet);
    this.timesheetsChanged.next(this.timesheets);
  }

  updateTimesheets(timesheet: Timesheet) {
    this.timesheets.forEach(ts => {
      if(ts.idtimesheet == timesheet.idtimesheet) {
        ts = timesheet;
      }
      this.timesheetsChanged.next(this.timesheets);
    })
  }

  setTimesheets(timesheets: Timesheet[]) {
    this.timesheets = timesheets;
    this.timesheetsChanged.next(this.timesheets);
  }

  returnTimesheets() {
    return this.timesheets;
  }

  updateTimesheetDB(timesheet: Timesheet) {
    const params = {
      timesheet: timesheet
    }
    const updateDB = this.http.post(this.serverUrl + 'updateOneTimesheet', params);
    return updateDB;
  }

  updateAllTimesheetsInDB(timesheets: Timesheet[]) {
    const params = { timesheets: timesheets};
    const updateDB = this.http.post(this.serverUrl + 'updateAllTimesheets', params);
    return updateDB;

  }

  addTimesheetinDB(timesheet: Timesheet, eventID) {
    const params = {
      timesheet: timesheet,
      eventID: eventID
    }
    const addTimesheet = this.http.post<number>(this.serverUrl + 'addTimesheet', params);
    return addTimesheet;
  }

  deleteTimesheetinDB(timesheetID: number) {
    const params = {id: timesheetID};
    const deleteTimesheet = this.http.post(this.serverUrl + 'deleteTimesheet', params);
    return deleteTimesheet;
  }

  /*********************************************************************************
   * OTHER
  *********************************************************************************/
  getEventNew() {
    return this.eventNew;
  }

  setEventNew(eventNew: boolean) {
    this.eventNew = eventNew;
    this.eventNewChanged.next(this.eventNew);
  }

  getEventEdit() {
    return this.eventEdit;
  }

  setEventEdit(eventEdit: boolean) {
    this.eventEdit = eventEdit;
    this.eventEditChanged.next(this.eventEdit);
  }

 getEventStaffEdit() {
   return this.eventStaffEdit;
 }

 setEventStaffEdit(staffEdit: boolean) {
   this.eventStaffEdit = staffEdit;
   this.eventStaffEditChanged.next(this.eventStaffEdit);
 }

 getEventStaffAdd() {
   return this.eventStaffAdd;
 }

 setEventStaffAdd(staffAdd: boolean) {
   this.eventStaffAdd = staffAdd;
   this.eventStaffAddChanged.next(this.eventStaffAdd);
 }

}