import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { ApiUserService } from './apiUser.service';
import { FormDataOptions } from './httpOptions';
import { FilmResponse } from '../models/films';

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

  addFilm(film: FormData): Observable<Response> {

    return this._http.post<Response>(this.baseURL + 'addFilm', film);
  }


}
