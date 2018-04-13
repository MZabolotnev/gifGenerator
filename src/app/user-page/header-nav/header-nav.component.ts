import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
  user: User;
  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.authenticationService.getUserDetails();
  }

  openAdminMenu() {
    let el =  document.getElementById('admin-nav');
    el.classList.toggle('down');
    let burg = document.getElementById('burg');
    burg.classList.toggle('cat');

  }
}
