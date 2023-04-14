import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../models/response';
import { UserAuth, UserLogin, UserRegister } from '../models/user';
import { map } from 'rxjs/operators';
import { httpOptions } from './httpOptions';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  baseURL: string = "https://localhost:7241/api/User";

  private _userSubject: BehaviorSubject<UserAuth>;

  public get userData(): UserAuth {
    return this._userSubject.value;
  }

  constructor(
    private _http: HttpClient
  ) { 
    this._userSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('user')!)) ;  
  }


   LogIn(userLog: UserLogin): Observable<Response> {
     return this._http.post<Response>(this.baseURL + "/login", userLog, httpOptions).pipe(
      map(response => {
          if(response.success === 1){
           const user: UserAuth = response.data; 
           localStorage.setItem('user', JSON.stringify(user));
            this._userSubject.next(user);
          }


          return response;
      }))};

      
    Register(user: UserRegister): Observable<Response> {
      return this._http.post<Response>(this.baseURL + "/register", user, httpOptions);
    }




    LogOut() {
    localStorage.removeItem('user');
    this._userSubject.next(null!);
    }

}
