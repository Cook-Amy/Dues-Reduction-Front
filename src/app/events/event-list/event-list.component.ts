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
  

  events: Event[] = [];
  seasons: Season[] = [];
  reversedSeasons: Season[];
  currentSeason: Season;
  // currentSeasonFromForm;

  constructor(private eventService: EventService, 
              private router: Router, 
              private route: ActivatedRoute) { }



  ngOnInit() {
    this.eventService.getSeasons().subscribe(res => {
      this.eventService.setSeasons(res);
      this.seasons = res;
      this.eventService.setCurrentSeason(this.seasons[this.seasons.length - 2]);
      this.currentSeason = this.eventService.getCurrentSeason();
      this.getEvents("dateAscending");
      // this.currentSeasonFromForm = this.seasonControl.value;
      // console.log('currentSeasonFromForm: ' + this.currentSeasonFromForm);
    });
  }



  getEvents(sort) {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = this.eventService.setEvents(events, sort);
    })
  }

  onNewEvent() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  // getDate(date) {
  //   var newDate = new Date(date);
  //   var convertDate = (newDate.getMonth() + 1) + '-' + newDate.getDate() + '-' + newDate.getFullYear();
  //   return convertDate;
  // }

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
