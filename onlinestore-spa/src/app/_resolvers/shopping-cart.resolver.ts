import { AlertService } from './../_services/alert.service';
import { AuthService } from './../_services/auth.service';
import { ShoppingCartService } from './../_services/shopping-cart.service';
import { CartProduct } from './../_models/cart-product';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ShoppingCartResolver implements Resolve<CartProduct[]>{

  constructor(private cartService: ShoppingCartService, private authService: AuthService, private alert: AlertService, private router: Router) { }

  resolve(): Observable<CartProduct[]> {

    return this.cartService.getCartForUser(this.authService.decodedToken.nameid)
      .pipe(
        catchError(() => {
          this.alert.error('Failed to retrive shopping cart items');
          this.router.navigate(['home']);
          return of(null);
        })
      );
  }

}
