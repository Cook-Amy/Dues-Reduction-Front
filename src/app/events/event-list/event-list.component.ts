import { Event } from './../../models/event.model';
import { Venue } from './../../models/venue.model';
import { VenueService } from './../../venues/venue.service';
import { EventService } from './../event.service';
import { Component, ComponentRef, OnInit, ViewChild, Renderer2, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Season } from 'src/app/models/season.model';
import { DataTableDirective } from 'angular-datatables';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  dtOptions: any = {};
  private childRow: ComponentRef<EventDetailComponent>;

  activeForm: FormGroup;

  selectedSeason: string;
  gotData = false;
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
              private router: Router,
              private _renderer: Renderer2,
              private compFactory: ComponentFactoryResolver,
              private viewRef: ViewContainerRef) { }

  ngOnInit() {
    this.gotData = false;
    this.allVenues = this.venueService.returnAllVenues();

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
      this.gotData = false;
      this.setAllEvents(eventsChanged);
      this.router.navigate([], {relativeTo: this.route});
    });

    this.eventNew = this.eventService.getEventNew();
    this.eventService.eventNewChanged.subscribe(newEventChanged => {
      this.eventNew = newEventChanged;
    });

      this.getDtOptions();
  }

  getDtOptions() {
    if(this.currentVenueID == 1) {

    }

    if(this.currentVenueID == 2) {

    }

    if(this.currentVenueID == 3) {
      this.dtOptions = { 
        paging: true,
        pagingType: 'full_numbers',
        pageLength: 20,
        lengthChange: true,
        columnDefs: [
          {
            targets: [2, 3],
            type: 'date'
          },
          {
            targets: [],
            visible: false
          }
        ]
      };
    }
  }

  expandRow(trRef, rowData) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      var row = dtInstance.row(trRef);
      if(row.child.isShown()) {
        row.child.hide();
        this._renderer.removeClass(trRef, 'shown');
      }
      else {
        let factory = this.compFactory.resolveComponentFactory (EventDetailComponent);
        this.childRow = this.viewRef.createComponent(factory);
        this.childRow.instance.setEvent = [rowData];
        this.childRow.instance.currentVenueID = this.currentVenueID;
        this.childRow.instance.currentSeasonID = this.currentSeasonID;
        row.child(this.childRow.location.nativeElement).show();
        this._renderer.addClass(trRef, 'shown');
      }
    });
  }

  preserveExpandedRows(datatableRef, id, tableData):void {
    try{
      const expandedIds = datatableRef.expandedRows.map(x => x[id]);
      datatableRef.expandedRows = tableData.filter(x => expandedIds.includes(x[id]));
    } catch (error) {
      if(error.name !== 'TypeError') throw error;
    }
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
    this.gotData = true;
  }

  changeSeason(change) {
    this.gotData = false;
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

  getDate(date) {
    if(date == null) {
      return "---";
    }
    else {
      var newDate: Date = new Date(date);

      if(newDate.getDate()) {
        var convertDate = (newDate.getMonth() + 1) + '-' + newDate.getDate() + '-' + newDate.getFullYear();
        return convertDate;
      } 
      else {
        return date;
      }
    }
  }

  getTime(date) {
    if(date == null) {
      date = this.checkForNullString(date);
    }
    var newDate: Date = new Date(date);
    var hours = newDate.getHours();
    var night = "PM";
    if(hours < 12) {
      night = "AM";
    }
    if(hours > 12) {
      hours -= 12;
    }
    var min = (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes();

    var convertDate = hours + ':' + min + " " + night;
    return convertDate;
  }

  checkForNullString(str) {
    if(str == null)
      return '0';
    else  
      return str;
  }

  checkForNullNum(num) {
    num = parseFloat(num);
    if(num == null || isNaN(num))
      return 0;
    else  {
      return num;
    }
  }

}

