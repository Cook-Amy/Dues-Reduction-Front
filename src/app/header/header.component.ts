import { AuthService } from './../auth/auth.service';
import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
import { Venue } from '../models/venue.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  venues: Venue[];

  constructor( private auth: AuthService) { }

  ngOnInit() {
    // this.serverService.getVenues().subscribe(data => {
    //   this.venues = data;
    // });
  }

  onLogout() {
    this.auth.onLogout();
  }

}

