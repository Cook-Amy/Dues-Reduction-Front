import { ContractCF } from './../models/contractCF.model';
import { ContractWC } from './../models/contractWC.model';
import { Job } from './../models/job.model';
import { GlobalVariables } from './../shared/GlobalVariables';
import { ContractPNC } from './../models/contractPNC.model';
import { EventCF } from './../models/eventCF.model';
import { EventWC } from './../models/eventWC.model';
import { Timesheet } from './../models/timesheet.model';
import { EventPNC } from './../models/eventPNC.model';
import { VenueService } from './../venues/venue.service';
import { Season } from 'src/app/models/season.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Event } from './../models/event.model';
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
  eventsChanged = new Subject<Event[]>();
  private events: Event[] = [];
  private currentEvent: Event;
  eventsSortedByDateDescendingChanged = new Subject<Event[]>();
  private eventsSortedByDateDescending: Event[] = [];
  eventsSortedByDateAscendingChanged = new Subject<Event[]>();
  private eventsSortedByDateAscending: Event[] = [];
  eventsSortedByNameAscendingChanged = new Subject<Event[]>();
  private eventsSortedByNameAscending: Event[] = [];
  eventsSortedByNameDescendingChanged = new Subject<Event[]>();
  private eventsSortedByNameDescending: Event[] = [];
  
  // PNC events
  eventsPncChanged = new Subject<EventPNC[]>();
  private eventsPnc: EventPNC[] = [];
  eventsPncSortedByDateDescendingChanged = new Subject<EventPNC[]>();
  private eventsPncSortedByDateDescending: EventPNC[] = [];
  eventsPncSortedByDateAscendingChanged = new Subject<EventPNC[]>();
  private eventsPncSortedByDateAscending: EventPNC[] = [];
  eventsPncSortedByNameAscendingChanged = new Subject<EventPNC[]>();
  private eventsPncSortedByNameAscending: EventPNC[] = [];
  eventsPncSortedByNameDescendingChanged = new Subject<EventPNC[]>();
  private eventsPncSortedByNameDescending: EventPNC[] = [];
  
  // WC events
  eventsWcChanged = new Subject<EventWC[]>();
  private eventsWc: EventWC[] = [];
  eventsWcSortedByDateDescendingChanged = new Subject<EventWC[]>();
  private eventsWcSortedByDateDescending: EventWC[] = [];
  eventsWcSortedByDateAscendingChanged = new Subject<EventWC[]>();
  private eventsWcSortedByDateAscending: EventWC[] = [];
  eventsWcSortedByNameAscendingChanged = new Subject<EventWC[]>();
  private eventsWcSortedByNameAscending: EventWC[] = [];
  eventsWcSortedByNameDescendingChanged = new Subject<EventWC[]>();
  private eventsWcSortedByNameDescending: EventWC[] = [];

  // CF events
  eventsCfChanged = new Subject<EventCF[]>();
  private eventsCf: EventCF[] = [];
  eventsCfSortedByDateDescendingChanged = new Subject<EventCF[]>();
  private eventsCfSortedByDateDescending: EventCF[] = [];
  eventsCfSortedByDateAscendingChanged = new Subject<EventCF[]>();
  private eventsCfSortedByDateAscending: EventCF[] = [];
  eventsCfSortedByNameAscendingChanged = new Subject<EventCF[]>();
  private eventsCfSortedByNameAscending: EventCF[] = [];
  eventsCfSortedByNameDescendingChanged = new Subject<EventCF[]>();
  private eventsCfSortedByNameDescending: EventCF[] = [];

  // Timesheets
  timesheets: Timesheet[] = [];
  timesheetsChanged = new Subject<Timesheet[]>();
  
  constructor(private http: HttpClient, private venueService: VenueService, private global: GlobalVariables) {}

  /*********************************************************************************
   * All Venue EVENTS 
  *********************************************************************************/
  // Get all events for selected season
  getAllEvents() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString())
                                    .set('venueID', this.venueService.getCurrentVenue().idvenue.toString());
    const eventsReturned = this.http.get<Event[]>(this.serverUrl + 'getEvents', {params});
    return eventsReturned;
  }

  // Get all venue specific events for selected season 
  getAllEventsVenue() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
    if(this.venueService.getCurrentVenue().idvenue ==  1) {
      const eventsVenueReturned = this.http.get<EventPNC[]>(this.serverUrl + 'getEventsPNC', {params});
      return eventsVenueReturned;
    }
  }

  getEventsLength() {
    return this.events.length;
  }

  // Save events to object after they come from DB, according to sort chosen
  setEvents(events: Event[], sort) {
    this.events = events;
    if(events == null) {

    }
    else {
      this.eventsChanged.next(this.events.slice());
    }

    if(sort === "dateDescending") {
      this.eventsSortedByDateDescending = events.sort((val1, val2) => {
        return <any>new Date(val2.Date) - <any>new Date(val1.Date) 
      });
      this.eventsSortedByDateDescendingChanged.next(this.eventsSortedByDateDescending.slice());
      return this.eventsSortedByDateDescending;
    }

    else if(sort === "dateAscending") {
      this.eventsSortedByDateAscending = events.sort((val1, val2) => {
        return <any>new Date(val1.Date) - <any>new Date(val2.Date) 
      });
      this.eventsSortedByDateAscendingChanged.next(this.eventsSortedByDateAscending.slice());
      return this.eventsSortedByDateAscending;
    }

    else if(sort === "nameDescending") {
      this.eventsSortedByNameDescending = events.sort((val1, val2) => {
        return (<any>val2.Title > <any>val1.Title) ? 1 : -1; 
      });
      this.eventsSortedByNameDescendingChanged.next(this.eventsSortedByNameDescending.slice());
      return this.eventsSortedByNameDescending;
    }

    else if(sort === "nameAscending") {
      this.eventsSortedByNameAscending = events.sort((val1, val2) => {
        return (<any>val1.Title > <any>val2.Title) ? 1 : -1; 
      });
      this.eventsSortedByNameAscendingChanged.next(this.eventsSortedByNameAscending.slice());
      return this.eventsSortedByNameAscending;
    }
  }


  getEvents() {
    return this.events;
  }

  getEventsSortedByDateDescending() {
    return this.eventsSortedByDateDescending;
  }

  getEventsSortedByDateAscending() {
    return this.eventsSortedByDateAscending.slice();
  }

  getEventsSortedByNameAscending() {
    return this.eventsSortedByNameAscending.slice();
  }

  getEventsSortedByNameDescending() {
    return this.eventsSortedByNameDescending.slice();
  }

  getEvent(index: number) {
    return this.events[index];
  }

  /*********************************************************************************
   * PNC EVENTS 
  *********************************************************************************/
  // get all PNC events from DB
  getAllEventsPnc() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
    const eventsReturned = this.http.get<EventPNC[]>(this.serverUrl + 'getEventsPNC', {params});
    return eventsReturned;
  }

  // set events locally
  setEventsPnc(events: EventPNC[]) {

    if(events == null) {

    }
    else {

      var eventsPnc:EventPNC[] = this.fixPncNumbers(events);

      // TODO: figure out why sorting isn't working
      // this.eventsPnc = eventsPnc;
      this.eventsPnc = eventsPnc.sort((val1, val2) => {
        return <any>new Date(val2.Date) - <any>new Date(val1.Date) 
      });
      this.eventsPncChanged.next(this.eventsPnc.slice());

      this.eventsPncSortedByDateDescending = eventsPnc.sort((val1, val2) => {
        return <any>new Date(val2.Date) - <any>new Date(val1.Date) 
      });
      this.eventsPncSortedByDateDescendingChanged.next(this.eventsPncSortedByDateDescending.slice());
    
      this.eventsPncSortedByDateAscending = eventsPnc.sort((val1, val2) => {
        return <any>new Date(val1.Date) - <any>new Date(val2.Date) 
      });
      this.eventsPncSortedByDateAscendingChanged.next(this.eventsPncSortedByDateAscending.slice());

      this.eventsPncSortedByNameDescending = eventsPnc.sort((val1, val2) => {
        return (<any>val2.Title > <any>val1.Title) ? 1 : -1; 
      });
      this.eventsPncSortedByNameDescendingChanged.next(this.eventsPncSortedByNameDescending.slice());

      this.eventsPncSortedByNameAscending = eventsPnc.sort((val1, val2) => {
        return (<any>val1.Title > <any>val2.Title) ? 1 : -1; 
      });
      this.eventsPncSortedByNameAscendingChanged.next(this.eventsPncSortedByNameAscending.slice());
    }
  }

  getEventsPnc(sort) {
    if(sort.includes("all")) { return this.eventsPnc; }
    else if(sort.includes("dateDescending")) { return this.eventsPncSortedByDateDescending; }
    else if(sort.includes("dateAscending")) { return this.eventsPncSortedByDateAscending; }
    else if(sort.includes("nameDescending")) { return this.eventsPncSortedByNameDescending; }
    else if(sort.includes("nameAscending")) { return this.eventsPncSortedByNameAscending; }
  }

  getEventsPncSortedByDateDescending() {
    return this.eventsPncSortedByDateDescending.slice();
  }

  getEventsPncSortedByDateAscending() {
    return this.eventsPncSortedByDateAscending.slice();
  }

  getEventsPncSortedByNameAscending() {
    return this.eventsPncSortedByNameAscending.slice();
  }

  getEventsPncSortedByNameDescending() {
    return this.eventsPncSortedByNameDescending.slice();
  }

  getEventPnc(index: number) {
    return this.eventsPnc[index];
  }

  setNewPncEvent(event: EventPNC) {

    const params = {
      idevent: event.idevent,
      Date: event.Date,
      Title: event.Title,
      compensated: event.compensated,
      location: event.location,
      venueBonus: event.venueBonus,
      estimatedCheck: event.estimatedCheck,
      estimatedProfit: event.estimatedProfit,
      actualCheck: event.actualCheck,
      payout: event.payout,
      discrepancy: event.discrepancy,
      actualProfit: event.actualProfit,
      tacPct: event.tacPct,
      tacCut: event.tacCut,
      drCut: event.drCut,
      eventNotes: event.eventNotes,
      closed: event.closed,
      metCommissionBonus: event.metCommissionBonus,
      guarantee: event.guarantee,
      totalSales: event.totalSales,
      alcSales: event.alcSales,
      coordinatorAdminAmt: event.coordinatorAdminAmt,
      eventCountsTowardsTotal: event.eventCountsTowardsTotal,
      season: this.currentSeason.idSeason
    };
    const eventSaved = this.http.post(this.serverUrl + 'setNewPncEvent', params);
    return eventSaved;
  }

  editPncEvent(event: EventPNC) {
    const params = {
      idevent: event.idevent,
      Date: event.Date,
      Title: event.Title,
      compensated: event.compensated,
      location: event.location,
      venueBonus: event.venueBonus,
      estimatedCheck: event.estimatedCheck,
      estimatedProfit: event.estimatedProfit,
      actualCheck: event.actualCheck,
      payout: event.payout,
      discrepancy: event.discrepancy,
      actualProfit: event.actualProfit,
      tacPct: event.tacPct,
      tacCut: event.tacCut,
      drCut: event.drCut,
      eventNotes: event.eventNotes,
      closed: event.closed,
      metCommissionBonus: event.metCommissionBonus,
      guarantee: event.guarantee,
      totalSales: event.totalSales,
      alcSales: event.alcSales,
      coordinatorAdminAmt: event.coordinatorAdminAmt,
      eventCountsTowardsTotal: event.eventCountsTowardsTotal,
      season: this.currentSeason.idSeason
    };

    const editEvent = this.http.post(this.serverUrl + 'editPncEvent', params);
    return editEvent;
  }

  deletePncEvent(event: EventPNC) {
    const params = { idevent: event.idevent };
    const deleteEvent = this.http.post(this.serverUrl + 'deletePncEvent', params);
    return deleteEvent;
  }

  getPncContractInfo() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
    const contractReturned = this.http.get<ContractPNC>(this.serverUrl + 'getContractPnc', {params});
    return contractReturned; 
  }

  fixPncNumbers(events: EventPNC[]) {

    // console.log('LENGTH: ' + events.length);
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
      if(event.totalSales)
        event.totalSales = parseFloat(event.totalSales.toFixed(2));
      if(event.alcSales)
        event.alcSales = parseFloat(event.alcSales.toFixed(2));

    })

    return events;
  }

  getPncJobs() {
    const getJobs = this.http.get<Job[]>(this.serverUrl + 'getPncJobs');
    return getJobs;
  }

  /*********************************************************************************
  * WC EVENTS 
  *********************************************************************************/
  // get all WC events from DB
  getAllEventsWc() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
    const eventsReturned = this.http.get<EventWC[]>(this.serverUrl + 'getEventsWC', {params});
    return eventsReturned;
  }

  // set events locally
  setEventsWc(eventsWc: EventWC[]) {
    if(eventsWc == null) {

    }
    else {
      var eventsWc:EventWC[] = this.fixWcNumbers(eventsWc);

      this.eventsWc = eventsWc.sort((val1, val2) => {
        return <any>new Date(val2.Date) - <any>new Date(val1.Date) 
      });
      this.eventsWcChanged.next(this.eventsWc.slice());

      this.eventsWcSortedByDateDescending = eventsWc.sort((val1, val2) => {
        return <any>new Date(val2.Date) - <any>new Date(val1.Date) 
      });
      this.eventsWcSortedByDateDescendingChanged.next(this.eventsWcSortedByDateDescending.slice());
    
      this.eventsWcSortedByDateAscending = eventsWc.sort((val1, val2) => {
        return <any>new Date(val1.Date) - <any>new Date(val2.Date) 
      });
      this.eventsWcSortedByDateAscendingChanged.next(this.eventsWcSortedByDateAscending.slice());

      this.eventsWcSortedByNameDescending = eventsWc.sort((val1, val2) => {
        return (<any>val2.Title > <any>val1.Title) ? 1 : -1; 
      });
      this.eventsWcSortedByNameDescendingChanged.next(this.eventsWcSortedByNameDescending.slice());

      this.eventsWcSortedByNameAscending = eventsWc.sort((val1, val2) => {
        return (<any>val1.Title > <any>val2.Title) ? 1 : -1; 
      });
      this.eventsWcSortedByNameAscendingChanged.next(this.eventsWcSortedByNameAscending.slice());
    }
  }

  getEventsWc(sort) {
    if(sort.includes("all")) { return this.eventsWc; }
    else if(sort.includes("dateDescending")) { return this.eventsWcSortedByDateDescending; }
    else if(sort.includes("dateAscending")) { return this.eventsWcSortedByDateAscending; }
    else if(sort.includes("nameDescending")) { return this.eventsWcSortedByNameDescending; }
    else if(sort.includes("nameAscending")) { return this.eventsWcSortedByNameAscending; }
  }

  getEventsWcSortedByDateDescending() {
    return this.eventsWcSortedByDateDescending.slice();
  }

  getEventsWcSortedByDateAscending() {
    return this.eventsWcSortedByDateAscending.slice();
  }

  getEventsWcSortedByNameAscending() {
    return this.eventsWcSortedByNameAscending.slice();
  }

  getEventsWcSortedByNameDescending() {
    return this.eventsWcSortedByNameDescending.slice();
  }

  getEventWc(index: number) {
    return this.eventsWc[index];
  }

  setNewWcEvent(event: EventWC) {

    const params = {
      idevent: event.idevent,
      Date: event.Date,
      Title: event.Title,
      compensated: event.compensated,
      location: event.location,
      venueBonus: event.venueBonus,
      estimatedCheck: event.estimatedCheck,
      estimatedProfit: event.estimatedProfit,
      actualCheck: event.actualCheck,
      payout: event.payout,
      discrepancy: event.discrepancy,
      actualProfit: event.actualProfit,
      tacPct: event.tacPct,
      tacCut: event.tacCut,
      drCut: event.drCut,
      eventNotes: event.eventNotes,
      closed: event.closed,
      eventcol: event.eventcol,
      shuttleBonusBool: event.shuttleBonusBool,
      shuttleBonusAmount: event.shuttleBonusAmount,
      creditCardTips: event.creditCardTips,
      maxCreditCardTips: event.maxCreditCardTips,
      coordinatorAdminAmt: event.coordinatorAdminAmt,
      season: this.currentSeason.idSeason
    };
    const eventSaved = this.http.post(this.serverUrl + 'setNewWcEvent', params);
    return eventSaved;
  }

  editWcEvent(event: EventWC) {
    const params = {
      idevent: event.idevent,
      Date: event.Date,
      Title: event.Title,
      compensated: event.compensated,
      location: event.location,
      venueBonus: event.venueBonus,
      estimatedCheck: event.estimatedCheck,
      estimatedProfit: event.estimatedProfit,
      actualCheck: event.actualCheck,
      payout: event.payout,
      discrepancy: event.discrepancy,
      actualProfit: event.actualProfit,
      tacPct: event.tacPct,
      tacCut: event.tacCut,
      drCut: event.drCut,
      eventNotes: event.eventNotes,
      closed: event.closed,
      eventcol: event.eventcol,
      shuttleBonusBool: event.shuttleBonusBool,
      shuttleBonusAmount: event.shuttleBonusAmount,
      creditCardTips: event.creditCardTips,
      maxCreditCardTips: event.maxCreditCardTips,
      coordinatorAdminAmt: event.coordinatorAdminAmt,
      season: this.currentSeason.idSeason
    };

    const editEvent = this.http.post(this.serverUrl + 'editWcEvent', params);
    return editEvent;
  }

  deleteWcEvent(event: EventWC) {
    const params = { idevent: event.idevent };
    const deleteEvent = this.http.post(this.serverUrl + 'deleteWcEvent', params);
    return deleteEvent;
  }

  getWcContractInfo() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
    const contractReturned = this.http.get<ContractWC>(this.serverUrl + 'getContractWc', {params});
    return contractReturned; 
  }

  fixWcNumbers(events: EventWC[]) {
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
      if(event.shuttleBonusAmount)
        event.shuttleBonusAmount = parseFloat(event.shuttleBonusAmount.toFixed(2));
      if(event.creditCardTips)
        event.creditCardTips = parseFloat(event.creditCardTips.toFixed(2));
      if(event.maxCreditCardTips)
        event.maxCreditCardTips = parseFloat(event.maxCreditCardTips.toFixed(2));
    });

    return events;
  }

  getWcJobs() {
    const getJobs = this.http.get<Job[]>(this.serverUrl + 'getWcJobs');
    return getJobs;
  }

  /*********************************************************************************
   * CF EVENTS 
  *********************************************************************************/
    // get all CF events from DB
    getAllEventsCf() {
      const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
      const eventsReturned = this.http.get<EventCF[]>(this.serverUrl + 'getEventsCF', {params});
      return eventsReturned;
    }
  
    // set events locally
    setEventsCf(eventsCf: EventCF[]) {
      if(eventsCf == null) {
  
      }
      else {
        var eventsCf:EventCF[] = this.fixCfNumbers(eventsCf);
  
        this.eventsCf = eventsCf.sort((val1, val2) => {
          return <any>new Date(val2.Date) - <any>new Date(val1.Date) 
        });
        this.eventsCfChanged.next(this.eventsCf.slice());
  
        this.eventsCfSortedByDateDescending = eventsCf.sort((val1, val2) => {
          return <any>new Date(val2.Date) - <any>new Date(val1.Date) 
        });
        this.eventsCfSortedByDateDescendingChanged.next(this.eventsCfSortedByDateDescending.slice());
      
        this.eventsCfSortedByDateAscending = eventsCf.sort((val1, val2) => {
          return <any>new Date(val1.Date) - <any>new Date(val2.Date) 
        });
        this.eventsCfSortedByDateAscendingChanged.next(this.eventsCfSortedByDateAscending.slice());
  
        this.eventsCfSortedByNameDescending = eventsCf.sort((val1, val2) => {
          return (<any>val2.Title > <any>val1.Title) ? 1 : -1; 
        });
        this.eventsCfSortedByNameDescendingChanged.next(this.eventsCfSortedByNameDescending.slice());
  
        this.eventsCfSortedByNameAscending = eventsCf.sort((val1, val2) => {
          return (<any>val1.Title > <any>val2.Title) ? 1 : -1; 
        });
        this.eventsCfSortedByNameAscendingChanged.next(this.eventsCfSortedByNameAscending.slice());
      }
    }
  
    getEventsCf(sort) {
      if(sort.includes("all")) { return this.eventsCf; }
      else if(sort.includes("dateDescending")) { return this.eventsCfSortedByDateDescending; }
      else if(sort.includes("dateAscending")) { return this.eventsCfSortedByDateAscending; }
      else if(sort.includes("nameDescending")) { return this.eventsCfSortedByNameDescending; }
      else if(sort.includes("nameAscending")) { return this.eventsCfSortedByNameAscending; }
    }
  
    getEventsCfSortedByDateDescending() {
      return this.eventsCfSortedByDateDescending.slice();
    }
  
    getEventsCfSortedByDateAscending() {
      return this.eventsCfSortedByDateAscending.slice();
    }
  
    getEventsCfSortedByNameAscending() {
      return this.eventsCfSortedByNameAscending.slice();
    }
  
    getEventsCfSortedByNameDescending() {
      return this.eventsCfSortedByNameDescending.slice();
    }
  
    getEventCf(index: number) {
      return this.eventsCf[index];
    }
  
    setNewCfEvent(event: EventCF) {
  
      const params = {
        idevent: event.idevent,
        Date: event.Date,
        Title: event.Title,
        compensated: event.compensated,
        location: event.location,
        venueBonus: event.venueBonus,
        estimatedCheck: event.estimatedCheck,
        estimatedProfit: event.estimatedProfit,
        actualCheck: event.actualCheck,
        payout: event.payout,
        discrepancy: event.discrepancy,
        actualProfit: event.actualProfit,
        tacPct: event.tacPct,
        tacCut: event.tacCut,
        drCut: event.drCut,
        eventNotes: event.eventNotes,
        closed: event.closed,
        eventcol: event.eventcol,
        shuttleBonusBool: event.shuttleBonusBool,
        shuttleBonusAmount: event.shuttleBonusAmount,
        shuttleLocation: event.shuttleLocation,
        totalSales: event.totalSales,
        coordinatorAdminAmt: event.coordinatorAdminAmt,
        season: this.currentSeason.idSeason
      };
      const eventSaved = this.http.post(this.serverUrl + 'setNewCfEvent', params);
      return eventSaved;
    }
  
    editCfEvent(event: EventCF) {
      const params = {
        idevent: event.idevent,
        Date: event.Date,
        Title: event.Title,
        compensated: event.compensated,
        location: event.location,
        venueBonus: event.venueBonus,
        estimatedCheck: event.estimatedCheck,
        estimatedProfit: event.estimatedProfit,
        actualCheck: event.actualCheck,
        payout: event.payout,
        discrepancy: event.discrepancy,
        actualProfit: event.actualProfit,
        tacPct: event.tacPct,
        tacCut: event.tacCut,
        drCut: event.drCut,
        eventNotes: event.eventNotes,
        closed: event.closed,
        eventcol: event.eventcol,
        shuttleBonusBool: event.shuttleBonusBool,
        shuttleBonusAmount: event.shuttleBonusAmount,
        shuttleLocation: event.shuttleLocation,
        totalSales: event.totalSales,
        coordinatorAdminAmt: event.coordinatorAdminAmt,
        season: this.currentSeason.idSeason
      };
  
      const editEvent = this.http.post(this.serverUrl + 'editCfEvent', params);
      return editEvent;
    }
  
    deleteCfEvent(event: EventCF) {
      const params = { idevent: event.idevent };
      const deleteEvent = this.http.post(this.serverUrl + 'deleteCfEvent', params);
      return deleteEvent;
    }
  
    getCfContractInfo() {
      const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
      const contractReturned = this.http.get<ContractCF>(this.serverUrl + 'getContractCf', {params});
      return contractReturned; 
    }
  
    fixCfNumbers(events: EventCF[]) {
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
        if(event.shuttleBonusAmount)
          event.shuttleBonusAmount = parseFloat(event.shuttleBonusAmount.toFixed(2));
        if(event.totalSales)
          event.totalSales = parseFloat(event.totalSales.toFixed(2));
      });
  
      return events;
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
