import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()

export class UsersService {
  constructor(private http: Http) {}

  getUserByEmail(email: string): Observable<User> {
    return this.http.get(`http:/localhost:3000/users?email=${email}`) //указываем где обрабатывает бэкенд
      .map((response: Response) => response.json())
        .map((user: User[]) => user[0] ? user[0] : undefined);
  }
  createNewUser(user: User): Observable<User> {
    return this.http.post(`http:/localhost:3000/users`, user)  //указываем где принимаем данные регистрации нового пользователя
      .map((response: Response) => response.json());
  }

}
