import { SiteUser } from './../../models/siteUser.model';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Venue } from '../../models/venue.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  venues: Venue[];
  currentUser: SiteUser;

  constructor( private auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
  }

  onLogout() {
    this.auth.onLogout();
  }

}

