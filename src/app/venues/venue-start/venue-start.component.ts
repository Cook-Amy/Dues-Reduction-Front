import { Router } from '@angular/router';
import { VenueService } from './../venue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venue-start',
  templateUrl: './venue-start.component.html',
  styleUrls: ['./venue-start.component.css']
})
export class VenueStartComponent implements OnInit {
  currentVenueID: number;

  constructor(private router: Router) { }

  ngOnInit() {
    const venuePath: string = this.router.url;

    if(venuePath == "/pnc"){
      this.currentVenueID = 1;
    }
    else if(venuePath == "/wc"){
      this.currentVenueID = 2;
    }
    else if(venuePath == "/cf"){
      this.currentVenueID = 3;
    }
    else if(venuePath == "/admin"){
      this.currentVenueID = 99;
    }
  }

}
