import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const AUTH_API = 'http://localhost:5001/api/auth/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  currentUser: any;
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(AUTH_API + 'login', model)
      .pipe(
        map((response: any) => {
          const result = response;
          this.currentUser = result.user;
          this.decodedToken = this.jwtHelper.decodeToken(result.token);

          localStorage.setItem('token', result.token);
          localStorage.setItem('user', result.user);
          console.log(this.decodedToken);

        })
      );
  }

  register(model: any) {
    return this.http.post(AUTH_API + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // get decodedToken() {
  //   const token = localStorage.getItem('token');
  //   return this.jwtHelper.decodeToken(token);
  // }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getToken() {
    return JSON.stringify(localStorage.getItem('token'));
  }

}
