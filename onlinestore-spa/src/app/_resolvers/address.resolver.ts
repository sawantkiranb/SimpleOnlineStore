import { Observable, of } from 'rxjs';
import { ShippingAddress } from './../_models/shipping-address';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AddressService } from '../_services/address.service';
import { AlertService } from '../_services/alert.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AddressResolver implements Resolve<ShippingAddress[]>{

  constructor(private authService: AuthService, private addressService: AddressService, private alert: AlertService) { }

  resolve(): Observable<ShippingAddress[]> {

    return this.addressService.getAddresses(this.authService.decodedToken.nameid)
      .pipe(
        catchError(() => {
          this.alert.error('Failed to retrive addresses');
          return of(null);
        })
      );
  }

}
