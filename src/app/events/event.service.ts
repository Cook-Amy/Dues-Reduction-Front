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
import { Theme } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  serverUrl = 'http://localhost:4000/';
  // serverUrl = 'http://duesbackend-env-1.b6qgyzs5az.us-east-2.elasticbeanstalk.com/';

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
  
  constructor(private http: HttpClient, private venueService: VenueService) {}

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
  getAllEventsPnc() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
    const eventsReturned = this.http.get<EventPNC[]>(this.serverUrl + 'getEventsPNC', {params});
    return eventsReturned;
  }

  setEventsPnc(eventsPnc: EventPNC[], sort) {
    this.eventsPnc = eventsPnc;
    if(eventsPnc == null) {

    }
    else {
      if(sort === "dateDescending") {
        this.eventsPncSortedByDateDescending = eventsPnc.sort((val1, val2) => {
          return <any>new Date(val2.Date) - <any>new Date(val1.Date) 
        });
        this.eventsPncSortedByDateDescendingChanged.next(this.eventsPncSortedByDateDescending.slice());
        return this.eventsPncSortedByDateDescending;
      }
  
      else if(sort === "dateAscending") {
        this.eventsPncSortedByDateAscending = eventsPnc.sort((val1, val2) => {
          return <any>new Date(val1.Date) - <any>new Date(val2.Date) 
        });
        this.eventsPncSortedByDateAscendingChanged.next(this.eventsPncSortedByDateAscending.slice());
        return this.eventsPncSortedByDateAscending;
      }
  
      else if(sort === "nameDescending") {
        this.eventsPncSortedByNameDescending = eventsPnc.sort((val1, val2) => {
          return (<any>val2.Title > <any>val1.Title) ? 1 : -1; 
        });
        this.eventsPncSortedByNameDescendingChanged.next(this.eventsPncSortedByNameDescending.slice());
        return this.eventsPncSortedByNameDescending;
      }
  
      else if(sort === "nameAscending") {
        this.eventsPncSortedByNameAscending = eventsPnc.sort((val1, val2) => {
          return (<any>val1.Title > <any>val2.Title) ? 1 : -1; 
        });
        this.eventsPncSortedByNameAscendingChanged.next(this.eventsPncSortedByNameAscending.slice());
        return this.eventsPncSortedByNameAscending;
      }
    }

  }

  getEventsPnc() {
    return this.eventsPnc.slice();
  }

  getEventsPncSortedByDateDescending() {
    return this.eventsPncSortedByDateDescending;
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

  /*********************************************************************************
  * WC EVENTS 
  *********************************************************************************/
  getAllEventsWc() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
    const eventsReturned = this.http.get<EventWC[]>(this.serverUrl + 'getEventsWC', {params});
    return eventsReturned;
  }

  setEventsWc(eventsWc: EventWC[], sort) {
    this.eventsWc = eventsWc;
    if(eventsWc == null) {

    }
    else {
      if(sort === "dateDescending") {
        this.eventsWcSortedByDateDescending = eventsWc.sort((val1, val2) => {
          return <any>new Date(val2.Date) - <any>new Date(val1.Date) 
        });
        this.eventsWcSortedByDateDescendingChanged.next(this.eventsWcSortedByDateDescending.slice());
        return this.eventsWcSortedByDateDescending;
      }

      else if(sort === "dateAscending") {
        this.eventsWcSortedByDateAscending = eventsWc.sort((val1, val2) => {
          return <any>new Date(val1.Date) - <any>new Date(val2.Date) 
        });
        this.eventsWcSortedByDateAscendingChanged.next(this.eventsWcSortedByDateAscending.slice());
        return this.eventsWcSortedByDateAscending;
      }

      else if(sort === "nameDescending") {
        this.eventsWcSortedByNameDescending = eventsWc.sort((val1, val2) => {
          return (<any>val2.Title > <any>val1.Title) ? 1 : -1; 
        });
        this.eventsWcSortedByNameDescendingChanged.next(this.eventsWcSortedByNameDescending.slice());
        return this.eventsWcSortedByNameDescending;
      }

      else if(sort === "nameAscending") {
        this.eventsWcSortedByNameAscending = eventsWc.sort((val1, val2) => {
          return (<any>val1.Title > <any>val2.Title) ? 1 : -1; 
        });
        this.eventsWcSortedByNameAscendingChanged.next(this.eventsWcSortedByNameAscending.slice());
        return this.eventsWcSortedByNameAscending;
      }
    }

  }

  getEventsWc() {
    return this.eventsWc.slice();
  }

  /*********************************************************************************
   * CF EVENTS 
  *********************************************************************************/
  getAllEventsCf() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString());
    const eventsReturned = this.http.get<EventCF[]>(this.serverUrl + 'getEventsCF', {params});
    return eventsReturned;
  }

  setEventsCf(eventsCf: EventCF[], sort) {
    this.eventsCf = eventsCf;
    if(eventsCf == null) {

    }
    else {
      if(sort === "dateDescending") {
        this.eventsCfSortedByDateDescending = eventsCf.sort((val1, val2) => {
          return <any>new Date(val2.Date) - <any>new Date(val1.Date) 
        });
        this.eventsCfSortedByDateDescendingChanged.next(this.eventsCfSortedByDateDescending.slice());
        return this.eventsCfSortedByDateDescending;
      }

      else if(sort === "dateAscending") {
        this.eventsCfSortedByDateAscending = eventsCf.sort((val1, val2) => {
          return <any>new Date(val1.Date) - <any>new Date(val2.Date) 
        });
        this.eventsCfSortedByDateAscendingChanged.next(this.eventsCfSortedByDateAscending.slice());
        return this.eventsCfSortedByDateAscending;
      }

      else if(sort === "nameDescending") {
        this.eventsCfSortedByNameDescending = eventsCf.sort((val1, val2) => {
          return (<any>val2.Title > <any>val1.Title) ? 1 : -1; 
        });
        this.eventsCfSortedByNameDescendingChanged.next(this.eventsCfSortedByNameDescending.slice());
        return this.eventsCfSortedByNameDescending;
      }

      else if(sort === "nameAscending") {
        this.eventsCfSortedByNameAscending = eventsCf.sort((val1, val2) => {
          return (<any>val1.Title > <any>val2.Title) ? 1 : -1; 
        });
        this.eventsCfSortedByNameAscendingChanged.next(this.eventsCfSortedByNameAscending.slice());
        return this.eventsCfSortedByNameAscending;
      }
    }
  }

  getEventsCf() {
    return this.eventsCf.slice();
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
   * STAFF FOR EVENT
  *********************************************************************************/
  getStaffForEvent(eventID) {
    const params = new HttpParams().set('eventID', eventID);
    const timesheetsReturned = this.http.get<Timesheet[]>(this.serverUrl + 'getStaffForEvent', {params});
    return timesheetsReturned;
  }
}