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

  
  constructor(private http: HttpClient, private venueService: VenueService) {}

  // Get all events for selected season
  getAllEvents() {
    const params = new HttpParams().set('seasonID', this.currentSeason.idSeason.toString())
                                    .set('venueID', this.venueService.getCurrentVenue().idvenue.toString());
    const eventsReturned = this.http.get<Event[]>(this.serverUrl + 'getEvents', {params});
    return eventsReturned;
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
        return <any>new Date(val2.dateTime) - <any>new Date(val1.dateTime) 
      });
      this.eventsSortedByDateDescendingChanged.next(this.eventsSortedByDateDescending.slice());
      return this.eventsSortedByDateDescending;
    }

    else if(sort === "dateAscending") {
      this.eventsSortedByDateAscending = events.sort((val1, val2) => {
        return <any>new Date(val1.dateTime) - <any>new Date(val2.dateTime) 
      });
      this.eventsSortedByDateAscendingChanged.next(this.eventsSortedByDateAscending.slice());
      return this.eventsSortedByDateAscending;
    }

    else if(sort === "nameDescending") {
      this.eventsSortedByNameDescending = events.sort((val1, val2) => {
        return (<any>val2.title > <any>val1.title) ? 1 : -1; 
      });
      this.eventsSortedByNameDescendingChanged.next(this.eventsSortedByNameDescending.slice());
      return this.eventsSortedByNameDescending;
    }

    else if(sort === "nameAscending") {
      this.eventsSortedByNameAscending = events.sort((val1, val2) => {
        return (<any>val1.title > <any>val2.title) ? 1 : -1; 
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

  // get all seasons from DB
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
  
}