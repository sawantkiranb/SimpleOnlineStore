import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { ProductService } from './../_services/product.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LikedProduct } from '../_models/liked-product';

@Injectable()
export class LikedProductsResolver implements Resolve<LikedProduct[]>{

  constructor(private authService: AuthService, private productService: ProductService, private alert: AlertService) { }

  resolve(): Observable<LikedProduct[]> {

    return this.productService.getLikedProducts(this.authService.decodedToken.nameid)
      .pipe(
        catchError(() => {
          this.alert.error('Failed to retrive products');
          return of(null);
        })
      );

  }

}
