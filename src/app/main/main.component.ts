import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {AuthenticationService} from '../shared/services/authentication.service';
import {User} from '../shared/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl:  'main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  user: User;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
      this.user = this.authenticationService.getUserDetails();
  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }


  openSlideMenu() {
    let el =  document.getElementById('side-menu');
    el.classList.toggle('visible');
    let overlay = document.getElementById('add-overlay');
    overlay.classList.toggle('side-nav-overlay');
  }

  closeSlideMenu() {
    let el =  document.getElementById('side-menu');
    el.classList.remove('visible');
    let overlay = document.getElementById('add-overlay');
    overlay.classList.remove('side-nav-overlay');
  }
  removeOverlay() {
    let overlay = document.getElementById('add-overlay');
    overlay.classList.remove('side-nav-overlay');
    let el =  document.getElementById('side-menu');
    el.classList.remove('visible');
  }
}
