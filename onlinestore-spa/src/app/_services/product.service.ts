import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:5001/api/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(API_URL);
  }

  getProduct(id: number) {
    return this.http.get(API_URL + '/' + id);
  }

  likeProduct(userId: number, productId: number) {
    return this.http.post(API_URL + '/' + userId + '/like/' + productId, {});
  }

  dislikeProduct(userId: number, productId: number) {
    return this.http.post(API_URL + '/' + userId + '/dislike/' + productId, {});
  }

  getLikedProducts(userId: number) {
    return this.http.get(API_URL + '/' + userId + '/like');
  }
}
