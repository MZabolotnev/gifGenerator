import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
      this.route.queryParams
        .subscribe((params: Params) => {
          // console.log('few', params);
          if(params['nowCanLogin']) {
            this.showMessage({
              text: 'Now you can login',
              type: 'success'
            });
          }
        });


    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }


  onSubmit() {
    // console.log(this.form);
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe((user:User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            // this.router.navigate(['']);  //редирект на определенную страницу
          } else {
              this.showMessage({
                text:'Wrong password',
                type: 'danger'
              });
          }
        } else {
          this.showMessage({
            text: 'This user does not exist',
            type: 'danger'
          });
        }
      })
  }

}