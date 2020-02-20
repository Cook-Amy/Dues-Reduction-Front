import { EventCF } from './../../models/eventCF.model';
import { EventWC } from './../../models/eventWC.model';
import { Venue } from './../../models/venue.model';
import { VenueService } from './../../venues/venue.service';
import { EventPNC } from './../../models/eventPNC.model';
import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Season } from 'src/app/models/season.model';
import { FormControl, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  selectedSeason: string;
  

  // events: Event[] = [];
  eventsPNC: EventPNC[];
  eventsWC: EventWC[];
  eventsCF: EventCF[];
  seasons: Season[] = [];
  // reversedSeasons: Season[];
  currentSeason: Season;
  currentVenue: Venue;
  currentVenueID: number;
  // currentSeasonFromForm;

  constructor(private eventService: EventService, 
              private venueService: VenueService,
              private router: Router, 
              private route: ActivatedRoute) { }



  ngOnInit() {
    this.eventService.getSeasons().subscribe(res => {
      this.eventService.setSeasons(res);
      this.seasons = res;
      this.eventService.setCurrentSeason(this.seasons[this.seasons.length - 2]);
      this.currentSeason = this.eventService.getCurrentSeason();
      this.currentVenue = this.venueService.getCurrentVenue();
      this.currentVenueID = this.currentVenue.idvenue;
      // console.log("current venue ID: " + this.currentVenueID);
      this.getEvents("dateAscending");
    });
  }

  getEvents(sort) {
    var venueID = this.currentVenueID;
    if(venueID == 1) {
      this.eventService.getAllEventsPnc().subscribe(eventsPNC => {
        this.eventsPNC = this.eventService.setEventsPnc(eventsPNC, sort);
      });
    }

    else if(venueID == 2) {
      this.eventService.getAllEventsWc().subscribe(eventsWC => {
        this.eventsWC = this.eventService.setEventsWc(eventsWC, sort);
      });
    }

    else if(venueID == 3) {
      this.eventService.getAllEventsCf().subscribe(eventsCF => {
        this.eventsCF = this.eventService.setEventsCf(eventsCF, sort);
      });
    }
  }

  onNewEvent() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  changeSeason(change) {
    if(change.seasonSelect == 999) {
      this.eventService.setCurrentSeason(this.seasons[this.seasons.length - 1]);
    }
    else {
      this.eventService.setCurrentSeason(this.seasons[change.seasonSelect - 1]);
    }
    this.currentSeason = this.eventService.getCurrentSeason();
    this.getEvents("dateAscending");
  }
}
