import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from './settings.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import { SiteUser } from './../models/siteUser.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  currentUser: SiteUser;
  userForm: FormGroup;
  validMsg: boolean = false;
  usernameMsg: boolean = false;
  newUsername: string;

  constructor(private auth: AuthService,
              private settings: SettingsService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    this.initForm();
  }

  initForm() {
    let firstName: string = this.currentUser.firstName;
    let lastName: string= this.currentUser.lastName;
    let phone: string = this.currentUser.phone;
    let titansEmail: string = this.currentUser.titansEmail;
    let personalEmail: string = this.currentUser.personalEmail;
    let userName: string = this.currentUser.userName;
    let password: string = "";

    this.userForm = new FormGroup ({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'phone': new FormControl(phone, Validators.required),
      'titansEmail': new FormControl(titansEmail, Validators.required),
      'personalEmail': new FormControl(personalEmail, Validators.required),
      'userName': new FormControl(userName, Validators.required),
      'password': new FormControl(password, Validators.required)
    });
  }

  onChangePassword() {
    this.toastr.warning("This feature is not yet working.", "COMING SOON", {
      closeButton: true,
      timeOut: 4000
    });
  }

  onSubmitChanges() {
    var checkNull = 0;
    checkNull = this.cannotBeNull(this.userForm.value['firstName']) + 
                    this.cannotBeNull(this.userForm.value['lastName']) + 
                    this.cannotBeNull(this.userForm.value['phone']) +
                    this.cannotBeNull(this.userForm.value['userName']) +
                    this.cannotBeNull(this.userForm.value['titansEmail']);

    if(checkNull > 0) {
      this.validMsg = true;
    }

    else {
      var oldUsername = this.currentUser.userName;
      this.newUsername = this.userForm.value['userName'];
      this.validMsg = false;
      this.usernameMsg = false;
      this.currentUser.firstName = this.userForm.value['firstName'];
      this.currentUser.lastName = this.userForm.value['lastName'];
      this.currentUser.phone = this.userForm.value['phone'];
      this.currentUser.titansEmail = this.userForm.value['titansEmail'];
      this.currentUser.personalEmail = this.checkForNull(this.userForm.value['personalEmail']);
      this.currentUser.userName = this.userForm.value['userName'];
  
      this.settings.changeSettings(this.currentUser).subscribe(res => {
        if(res.username) {
          this.usernameMsg = true;
          this.currentUser.userName = oldUsername;
          // this.initForm();
        }
        else {
          this.auth.changeCurrentUserSettings(this.currentUser);
          this.initForm();
          this.toastr.success("Your settings have been changed.", "SUCCESS!", {
            closeButton: true,
            timeOut: 4000
          });
          this.router.navigate(['/home']);
        }
      });
    }

  }

  onCancelChanges() {
    this.initForm();
    this.router.navigate(['/home']);
  }

  cannotBeNull(input: string) {
    if(input == "" || input == null) {
      return 1;
    }
    return 0;
  }
  checkForNull(input: string) {
    var newInput = "";
    if(input) {
      newInput = input;
    }
    return newInput;
  }

}
