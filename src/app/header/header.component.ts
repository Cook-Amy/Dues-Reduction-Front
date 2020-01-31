import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  venues: any = [];

  constructor( private server: ServerService) { }

  ngOnInit() {
    this.server.getVenues().subscribe(data => {
      this.venues = data;
      // console.log("Data back from DB: " + this.venues[0].idvenue);
    });
  }

}
