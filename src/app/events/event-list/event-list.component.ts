import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Season } from 'src/app/models/season.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[];
  seasons: Season[];
  reversedSeasons: Season[];
  // seasonForm: FormGroup;

  constructor(private eventService: EventService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.events = this.eventService.getEvents();
    this.seasons = this.eventService.getSeasons();
    this.reversedSeasons = this.seasons.slice().reverse();

    // this.seasonForm = this.fb.group({
    //   formControl: [this.seasons[0].seasonName]
    // });
  }

  onNewEvent() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
