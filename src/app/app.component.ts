import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth/auth.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.autoAuthUser();
    if(!this.isLoggedIn) {
      this.router.navigate(['']);
    }
    else{
      this.router.navigate(['/home']);
      // this.router.navigate([], {relativeTo: this.route});
    }
  }

}
