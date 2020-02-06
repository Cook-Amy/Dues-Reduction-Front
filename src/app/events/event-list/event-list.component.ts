import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[];

  constructor(private eventService: EventService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }

  onNewEvent() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
