import { ShippingAddress } from './../_models/shipping-address';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:5001/api/address/';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAddresses(userId: number) {
    return this.http.get(API_URL + userId);
  }

  getAddress(userId: number, id: number) {
    return this.http.get(API_URL + userId + '/address/' + id);
  }

  setDefault(userId: number, id: number) {
    return this.http.post(API_URL + userId + '/address/' + id, {});
  }

  deleteAddress(userId: number, id: number) {
    return this.http.delete(API_URL + userId + '/address/' + id);
  }

  addAddress(userId: number, address: ShippingAddress) {
    return this.http.post(API_URL + userId, address);
  }

  updateAddress(userId: number, address: ShippingAddress) {
    return this.http.put(API_URL + userId, address);
  }

}
