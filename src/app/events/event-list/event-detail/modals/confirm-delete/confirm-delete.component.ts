import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/events/event.service';
import { Event } from 'src/app/models/event.model';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Season } from 'src/app/models/season.model';
import { EventListComponent } from '../../../event-list.component';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {
  @Input() event: Event;
  @Input() currentSeasonID: number;

  modalOptions: NgbModalOptions;
  currentSeason: Season;
  
  constructor(private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    public activeModal: NgbActiveModal) {
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop',
        size: 'xl',
        centered: false
     } 
    }

  ngOnInit() {
    this.eventService.getSeasons().subscribe(res => {
      this.eventService.setSeasons(res);
      this.eventService.setCurrentSeasonById(this.currentSeasonID);
      this.currentSeason = this.eventService.getCurrentSeason();
    });
  }

  onDeleteYes() {
    this.eventService.deleteEvent(this.event).subscribe(res => {
      this.eventService.getAllEvents().subscribe(events => {
        this.eventService.setAllEvents(events);
        this.redirectTo();
        this.activeModal.dismiss("Event deleted");
      });
    });
  }

  redirectTo() {
    var route = this.router.url;
    console.log("route: " + route);
    var redir = '';
    if(route == '/pnc/events')
      redir = '/pnc';
    else if(route == '/wc/events')
      redir = '/wc';
    else if(route == '/cf/events')
      redir = '/cf';
    else if(route == '/admin/events')
      redir = '/admin';
    else
      redir = '/home';

    console.log("redir: " + redir);
    this.router.navigateByUrl(redir, {skipLocationChange: true}).then(()=>
    this.router.navigate([route]));
  }

} 

