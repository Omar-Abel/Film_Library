import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../models/response';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  url: string = "https://localhost:7241/api/User/login";

  private _userSubject: BehaviorSubject<User> | any;

  public get userData(): User {
    return this._userSubject.value;
  }

  constructor(
    private _http: HttpClient
  ) { 
    this._userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
  }


   LogIn(userName: string, password: string): Observable<Response> {
     return this._http.post<Response>(this.url, {userName, password}, httpOptions).pipe(
      map(response => {
          if(response.success === 1){
           const user: User = response.data; 
           localStorage.setItem('user', JSON.stringify(user));
           
            this._userSubject.next(user);
          }
          return response;
      })
     );
   }



    LogOut() {
    localStorage.removeItem('user');
    this._userSubject.next(null);
    }

}
