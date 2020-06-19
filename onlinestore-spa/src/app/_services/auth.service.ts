import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const AUTH_API = 'http://localhost:5001/api/auth/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  currentUser: any;
  decodedToken: any;

  shoppingCartCount = new BehaviorSubject<number>(0);
  currentShoppingCartCount = this.shoppingCartCount.asObservable();

  constructor(private http: HttpClient) { }

  changeShoppingCartCount(count: number) {
    this.shoppingCartCount.next(count);
  }

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

          this.changeShoppingCartCount(0);

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
    this.changeShoppingCartCount(0);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
