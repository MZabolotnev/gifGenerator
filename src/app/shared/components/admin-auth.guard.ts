import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {User} from '../models/user.model';

@Injectable()
export class AdminAuthGuard  {
  user: Observable<User>;
  // implements CanActivate
  constructor(private auth: AuthenticationService,
              private userService: UserService) { }
  //
  // canActivate(): Observable<boolean> {
  //   return this.user
  //     .switchMap(user => this.userService.getProfile())
  //     .map(user => user.isAdmin);
  // }

}
