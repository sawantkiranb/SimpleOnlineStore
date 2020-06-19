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
}
