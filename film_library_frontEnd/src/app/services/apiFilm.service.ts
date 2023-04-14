import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { ApiUserService } from './apiUser.service';
import { httpOptions } from './httpOptions';

@Injectable({
  providedIn: 'root',
})
export class apiFilmService {
  baseURL: string = 'https://localhost:7241/api/Films/';

  constructor(
    private _http: HttpClient,
    private _apiAuthService: ApiUserService
  ) {}

  getUserFilms(): Observable<Response> {
    return this._http.get<Response>(this.baseURL  + this._apiAuthService.userData.id);
  }

  addFilm(film: any): Observable<Response> {
    return this._http.post<Response>(this.baseURL + 'addFilm', film);
  }


}
