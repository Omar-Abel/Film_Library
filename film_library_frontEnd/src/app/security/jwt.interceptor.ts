import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiUserService } from "../services/apiUser.service";
import { Observable } from "rxjs";

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private _apiAuthService: ApiUserService
  ){}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this._apiAuthService.userData;
    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }

    return next.handle(request);
  }


}