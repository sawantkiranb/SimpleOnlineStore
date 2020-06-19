import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.loggedIn()) {

      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.authService.getToken())
      });

    }

    return next.handle(request);

  }

}
