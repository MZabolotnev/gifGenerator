﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {appConfig} from '../../app.config';
import {Router} from '@angular/router';
import {User} from '../models/user.model';

@Injectable()
export class AuthenticationService {
  private token: string;

    constructor(private http: HttpClient,
                private  router: Router) { }

    login(email: string, password: string) {
        return this.http.post<any>(appConfig.apiUrl + '/authenticate', { email: email, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
      this.token = '';
      localStorage.removeItem('currentUser');

    }
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('currentUser');
    }
    return this.token;
  }
  public getUserDetails(): User {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  // ??????
  // public isLoggedIn(): boolean {
  //   const user = this.getUserDetails();
  //   if (user) {
  //     return user.exp > Date.now() / 1000;
  //   } else {
  //     return false;
  //   }
  // }
}
