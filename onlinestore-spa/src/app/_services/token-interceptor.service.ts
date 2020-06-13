import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.loggedIn()) {

      const token = this.authService.getToken();

      const newHeaders = req.headers;

      newHeaders.append('Authorization', 'Bearer ' + token);

      const authReq = req.clone({ headers: newHeaders });

      return next.handle(authReq);
    }
    return next.handle(req);
  }

}
