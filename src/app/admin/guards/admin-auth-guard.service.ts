import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    // decode the token to get its payload
    const tokenPayload = this.auth.getUserDetails();
    if (
      tokenPayload.admin !== true
    ) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;
  }
// need to test
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(childRoute, state);
  }
}
