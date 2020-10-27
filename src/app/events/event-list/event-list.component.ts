import { Event } from './../../models/event.model';
import { Venue } from './../../models/venue.model';
import { VenueService } from './../../venues/venue.service';
import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Season } from 'src/app/models/season.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  selectedSeason: string;

  eventsAll: Event[] = [];
  eventsPNC: Event[];
  eventsWC: Event[];
  eventsCF: Event[];
  seasons: Season[] = [];
  currentSeason: Season;
  currentSeasonID: number;
  allVenues: Venue[] = [];
  currentVenue: Venue;
  currentVenueID: number;

  // sort: String = "dateAscending";
  eventNew: Boolean;

  constructor(private eventService: EventService, 
              private venueService: VenueService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.allVenues = this.venueService.returnAllVenues();

    this.eventService.getSeasons().subscribe(res => {
      this.eventService.setSeasons(res);
      this.seasons = res;
      this.eventService.setCurrentSeason(this.seasons[this.seasons.length - 2]);
      this.currentSeason = this.eventService.getCurrentSeason();
      this.currentSeasonID = this.currentSeason.idSeason;
      console.log("current season: " + this.currentSeason + " : " + this.currentSeasonID);

      this.currentVenue = this.venueService.getCurrentVenue();
      this.currentVenueID = this.currentVenue.idvenue;
      this.getEvents();
    });

    this.eventService.eventsAllChanged.subscribe(eventsChanged => {
      this.setAllEvents(eventsChanged);
      this.router.navigate([], {relativeTo: this.route});
    });

    this.eventNew = this.eventService.getEventNew();
    this.eventService.eventNewChanged.subscribe(newEventChanged => {
      this.eventNew = newEventChanged;
    });

  }

  getEvents() {
    this.eventService.getAllEvents().subscribe(allEvents => {
      this.eventService.setAllEvents(allEvents);
    })
  }

  setAllEvents(allEvents) {
    this.eventService.setVenueEvents(allEvents);

    this.eventsAll = this.eventService.returnEventsAll();
    this.eventsPNC = this.eventService.returnEventsPnc();
    this.eventsWC = this.eventService.returnEventsWc();
    this.eventsCF = this.eventService.returnEventsCf();

    
  }

  changeSeason(change) {
    if(change.seasonSelect == 999) {
      this.eventService.setCurrentSeason(this.seasons[this.seasons.length - 1]);
    }
    else {
      this.eventService.setCurrentSeason(this.seasons[change.seasonSelect - 1]);
    }
    this.currentSeason = this.eventService.getCurrentSeason();
    this.currentSeasonID = this.currentSeason.idSeason;
    this.getEvents();
  }

  changeVenue(change) {
    if(change.venueSelect == 1) {
      this.eventsAll = this.eventService.returnEventsPnc();
    }
    else if(change.venueSelect == 2) {
      this.eventsAll = this.eventService.returnEventsWc();
    }
    else if(change.venueSelect == 3) {
      this.eventsAll = this.eventService.returnEventsCf();
    }
    else if(change.venueSelect == 99) {
      this.eventsAll = this.eventService.returnEventsAll();
    }
  }

  addNewEvent() {
    this.eventNew = true;
  }
}

