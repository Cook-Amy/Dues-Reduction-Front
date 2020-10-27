import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-venue-links',
  templateUrl: './venue-links.component.html',
  styleUrls: ['./venue-links.component.css']
})
export class VenueLinksComponent implements OnInit {
  @Input() idVenue : number;

  constructor() { }

  ngOnInit() {
  }

  onSelect(feature: string) {
  }

}
