import { EventService } from './../../event.service';
import { Event } from './../../../models/event.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  id: number;

  constructor(private eventService: EventService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.event = this.eventService.getEvent(this.id);
        }
      );
  }

  onEditEvent() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // console.log(this.route);
    // if you need to define an exact path when the id is not already in the current route: 
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

}
