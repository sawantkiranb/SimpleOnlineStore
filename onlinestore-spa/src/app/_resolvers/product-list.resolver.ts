import { AlertService } from './../_services/alert.service';
import { ProductService } from './../_services/product.service';
import { Observable, of } from 'rxjs';
import { Product } from './../_models/product';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProductListResolver implements Resolve<Product[]>{

  constructor(private productService: ProductService, private alert: AlertService) { }

  resolve(): Observable<Product[]> {

    return this.productService.getProducts()
      .pipe(catchError(() => {
        this.alert.error('Failed to retrive products');
        return of(null);
      }));

  }

}
