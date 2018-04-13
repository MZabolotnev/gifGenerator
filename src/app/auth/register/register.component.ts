import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService} from '../../shared/services/user.service';
import {AlertService} from '../../shared/services/alert.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    form: FormGroup;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

  ngOnInit() {
          this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'name': new FormControl(null, [Validators.required]),
            'agree': new FormControl(true, [Validators.requiredTrue])
          });
        }

    register() {
        const regData = {
          email: this.form.value.email,
          password: this.form.value.password,
          name: this.form.value.name
        };
        this.userService.addUser(regData)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/auth/login']);
                },
                error => {
                    this.alertService.error(error);

                });
    }
    //async validation email(need to test)
  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }

}

// this.forbiddenEmails.bind(this)
