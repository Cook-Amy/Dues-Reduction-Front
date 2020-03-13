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
  currentVenue: Venue;
  currentVenueID: number;

  // sort: String = "dateAscending";
  eventNew: Boolean;

  constructor(private eventService: EventService, 
              private venueService: VenueService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.eventService.getSeasons().subscribe(res => {
      this.eventService.setSeasons(res);
      this.seasons = res;
      this.eventService.setCurrentSeason(this.seasons[this.seasons.length - 2]);
      this.currentSeason = this.eventService.getCurrentSeason();
      this.currentSeasonID = this.currentSeason.idSeason;
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

  addNewEvent() {
    this.eventNew = true;
  }
}

// old way
// ngOnInit() {
//   this.eventService.getSeasons().subscribe(res => {
//     this.eventService.setSeasons(res);
//     this.seasons = res;
//     this.eventService.setCurrentSeason(this.seasons[this.seasons.length - 2]);
//     this.currentSeason = this.eventService.getCurrentSeason();
//     this.currentVenue = this.venueService.getCurrentVenue();
//     this.currentVenueID = this.currentVenue.idvenue;
//     this.getEvents();
//   });

//   this.eventNew = this.eventService.getEventNew();
//   this.eventService.eventNewChanged.subscribe(newEventChanged => {
//     this.eventNew = newEventChanged;
//   });

//   this.eventService.eventsPncSortedByDateAscendingChanged.subscribe(events => {
//     this.eventsPNC = events;
//     this.router.navigate([], {relativeTo: this.route});
//   });

//   this.eventService.eventsWcSortedByDateAscendingChanged.subscribe(events => {
//     this.eventsWC = events;
//     this.router.navigate([], {relativeTo: this.route});
//   });

//   this.eventService.eventsCfSortedByDateAscendingChanged.subscribe(events => {
//     this.eventsCF = events;
//     this.router.navigate([], {relativeTo: this.route});
//   });
// }

// getEvents() {
//   var venueID = this.currentVenueID;
//   if(venueID == 1) {
//     this.eventService.getAllEventsPnc().subscribe(eventsPNC => {
//       this.eventService.setEventsPnc(eventsPNC);
//       this.sort = "dateAscending";
//       this.eventService.eventsPncSortedByDateAscendingChanged.subscribe(events => {
//         this.eventsPNC = events;
//       });
//     });
//   }

//   else if(venueID == 2) {
//     this.eventService.getAllEventsWc().subscribe(eventsWC => {
//       this.eventService.setEventsWc(eventsWC);
//       this.sort = "dateAscending";
//       this.eventService.eventsWcSortedByDateAscendingChanged.subscribe(events => {
//         this.eventsWC = events;
//       });
//     });
//   }

//   else if(venueID == 3) {
//     this.eventService.getAllEventsCf().subscribe(eventsCF => {
//       this.eventService.setEventsCf(eventsCF);
//       this.sort = "dateAscending";
//       this.eventService.eventsCfSortedByDateAscendingChanged.subscribe(events => {
//         this.eventsCF = events;
//       });
//     });
//   }

//   else if(venueID == 99) {
//     this.eventService.getAllEventsPnc().subscribe(eventsPnc => {
//       this.eventService.setEventsPnc(eventsPnc);
//       this.eventsAll = this.eventService.getEventsPncSortedByDateDescending();
//       console.log("all events: " + this.eventsAll.length);
//       this.eventService.getAllEventsWc().subscribe(eventsWc => {
//         this.eventService.setEventsWc(eventsWc);
//         var temp: any[] = [];
//         temp = this.eventService.getEventsWcSortedByDateDescending();
//         temp.forEach(t => {
//           this.eventsAll.push(t);
//         });
//       console.log("all events: " + this.eventsAll.length);
//       this.eventService.getAllEventsCf().subscribe(eventsCf => {
//         this.eventService.setEventsCf(eventsCf);
//         var temp2: any[] = [];
//         temp2 = this.eventService.getEventsCfSortedByDateDescending();
//         temp2.forEach(t => {
//           this.eventsAll.push(t);
//         });
//       });
//       });
//     });
//   }
// }

// changeSeason(change) {
//   if(change.seasonSelect == 999) {
//     this.eventService.setCurrentSeason(this.seasons[this.seasons.length - 1]);
//   }
//   else {
//     this.eventService.setCurrentSeason(this.seasons[change.seasonSelect - 1]);
//   }
//   this.currentSeason = this.eventService.getCurrentSeason();
//   this.getEvents();
// }

// addNewEvent() {
//   this.eventNew = true;
// }
// }

