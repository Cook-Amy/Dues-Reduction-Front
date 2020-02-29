import { AuthService } from './../auth/auth.service';
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

  ngOnInit() {}

  onLogout() {
    this.auth.onLogout();
  }

}

