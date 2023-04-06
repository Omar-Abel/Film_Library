import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class apiFilmService {

 url: string = 'https://localhost:7241/api/Films';

  constructor(
    private _http: HttpClient
  ) { }
  
  getFilms(): Observable<Response>{
    return this._http.get<Response>(this.url);
  }
}
