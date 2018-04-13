import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AlertService} from '../../shared/services/alert.service';
import {AuthenticationService } from '../../shared/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ngx-facebook';

declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {
  form: FormGroup;

  // returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private fb: FacebookService) {

    const initParams: InitParams = {
      appId: '197708884157945',
      xfbml: true,
      version: 'v2.12'
    };

    fb.init(initParams);

  }

  loginFacebook() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list'
    };
    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
        this.router.navigate(['/']);
      })
      .catch((error: any) => console.error(error));
    // this.alertService.error(error); ????
  }
  logoutFacebook() {
    this.fb.logout()
      .then(() => {
        console.log('Logged out!');
        this.router.navigate(['/auth/login']);
      })
      .catch((error: any) => console.error(error));
    // this.alertService.error(error); ????
  }
  // need too develop because need to plus div block(logout) adn chek if it true or false
  getLoginStatus() {
    this.fb.getLoginStatus()
      .then(res => {
        if ( res && res.status === 'connected' ) {
          this.fb.logout();
        }
      })
      .catch((error: any) => console.error(error));
  }

  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '399081557519-bdog809phb4tg4ei2fjvnkn7tn2vso7r.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        this.router.navigate(['/']);

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
        // this.alertService.error(error); ????
      });
  }
  ngAfterViewInit() {
    this.googleInit();
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  login() {
    this.authenticationService.login(this.form.value.email, this.form.value.password)
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
        });
  }

}

