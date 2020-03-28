import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  token: any;
  error:string = null;
  imgPath: any;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.imgPath = this.authService.logoPath + 'TitansTeam.jpg';
  }

  onLogin(form: NgForm) {
    const email = form.value.inputEmail;
    const password = form.value.inputPassword;
    this.authService.getUser(email, password).subscribe(res => {
      // console.log(res);
      if(!res) {
        this.error = "Username and/or password are not correct.";
        console.log("Username and/or password are not correct");
      }
      else {
        const token = res.token;
        if(token) {
          this.error = null;
          this.authService.authenticated.next(true);
          this.authService.saveUser(res.token, res.user[0]);
          this.router.navigate(['/home']);
        }
      }
    });
    form.reset();
  }



}
