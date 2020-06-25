import { AlertService } from './../_services/alert.service';
import { ProductService } from './../_services/product.service';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Product } from '../_models/product';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProductDetailsResolver implements Resolve<Product>{

  constructor(private productService: ProductService, private alert: AlertService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {

    return this.productService.getProduct(route.params.id)
      .pipe(
        catchError(() => {
          this.alert.error('Failed to retrive product');
          return of(null);
        })
      );
  }

}
