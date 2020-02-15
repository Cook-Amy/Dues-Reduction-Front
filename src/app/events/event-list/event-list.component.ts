import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Season } from 'src/app/models/season.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  seasons: Season[] = [];
  reversedSeasons: Season[];
  currentSeason: Season;

  constructor(private eventService: EventService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventService.getSeasons().subscribe(res => {
      this.eventService.setSeasons(res);
      this.seasons = res;
      this.eventService.setCurrentSeason(this.seasons[this.seasons.length - 1]);
      this.currentSeason = this.eventService.getCurrentSeason();
      this.getEvents("dateDescending");
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

  getDate(date) {
    var newDate = new Date(date);
    var convertDate = (newDate.getMonth() + 1) + '-' + newDate.getDate() + '-' + newDate.getFullYear();
    return convertDate;
  }
}
