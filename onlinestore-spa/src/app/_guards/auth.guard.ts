import { AlertService } from './../_services/alert.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private alert: AlertService, private router: Router) { }

  canActivate(): boolean {

    if (this.authService.loggedIn()) {
      return true;
    }

    this.alert.error('You shall not pass...');
    this.router.navigate(['/home']);
    return false;

  }

}
