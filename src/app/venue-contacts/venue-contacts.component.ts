import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venue-contacts',
  templateUrl: './venue-contacts.component.html',
  styleUrls: ['./venue-contacts.component.css']
})
export class VenueContactsComponent implements OnInit {
  people = allPeople;

  constructor() { }

  ngOnInit() {
  }

}

var allPeople = [
  {"name": "Amy Cook", "contact": "919-280-1828", "email": "cookabc@hotmail.com"},
  {"name": "Sarah Alexander", "contact": "919-219-5750", "email": "sarah.alexander@townofcary.org"},
  {"name": "Manit Suphavadeprasit", "contact": "919-345-2615", "email": "ManitS@gmail.com"}
];
