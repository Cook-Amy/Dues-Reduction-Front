import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  error:string = null;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const email = form.value.inputEmail;
    const password = form.value.inputPassword;
    this.authService.getUser(email, password).subscribe(res => {
      console.log(res);
      if(!res) {
        this.error = "Username and/or password are not correct.";
        console.log("Username and/or password are not correct");
      }
      else {
        this.error = null;
        console.log("Username and password are correct");
      }
    });
    form.reset();
  }

}
