import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonOptions } from './httpOptions';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { ApiUserService } from './apiUser.service';
import { CategoriesResponse } from '../models/Categories';


@Injectable({
  providedIn: 'root'
})
export class ApiCategoriesServiceService {

  constructor(
    private _http: HttpClient,
    private _apiAuthService: ApiUserService
  ) { }

  baseUrl = 'https://localhost:7241/api/Categories/';

  getUserCategories(): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + this._apiAuthService.userData.id);
  }

  addUserCategory(category: CategoriesResponse): Observable<Response> {
    return this._http.post<Response>(this.baseUrl + 'addCategory', category ,JsonOptions);
  }

  deleteUserCategory(categoryId: number): Observable<Response> {
    return this._http.delete<Response>(this.baseUrl + categoryId);
  }

}
