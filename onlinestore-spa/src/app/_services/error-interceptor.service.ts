import { catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any) => {

        if (error.status === 401) {
          return throwError(error.statusText);
        }

        let modelStateError = '';

        if (error.status === 400) {

          const serverError = error.error;
          if (typeof serverError.errors === 'object') {

            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modelStateError += serverError.errors[key][0] + '\n';
              }
            }
          } else if (serverError !== '') {
            return throwError(serverError);
          }

        }
        return throwError(modelStateError || 'Server error');
      })
    );
  }

}
