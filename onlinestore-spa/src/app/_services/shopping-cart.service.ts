import { CartProduct } from './../_models/cart-product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API_URL = 'http://localhost:5001/api/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) { }

  addToCart(userId: number, cartItem: CartProduct) {
    return this.http.post(API_URL + '/' + userId + '/cart', cartItem);
  }

  getCartCount(userId: number) {
    return this.http.get(API_URL + '/' + userId + '/cart/count');
  }

  getCartForUser(userId: number) {
    return this.http.get(API_URL + '/' + userId + '/cart');
  }

  deleteCartItem(userId: number, id: number) {
    return this.http.delete(API_URL + '/' + userId + '/cart/' + id);
  }

}
