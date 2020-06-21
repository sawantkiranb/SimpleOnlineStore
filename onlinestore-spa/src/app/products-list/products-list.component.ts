import { AuthService } from './../_services/auth.service';
import { ShoppingCartService } from './../_services/shopping-cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './../_models/product';
import { ProductService } from './../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[];

  sortSelectedValue = 'new';

  sortList: any[] = [
    { value: 'new', displayName: 'New First' },
    { value: 'pricehtl', displayName: 'Price: High To Low' },
    { value: 'pricelth', displayName: 'Price: Low To High' },
  ];

  constructor(private authService: AuthService, private cartService: ShoppingCartService, private productService: ProductService, private alert: AlertService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.products = result.products;
    });

    if (this.authService.loggedIn()) {
      this.cartService.getCartCount(this.authService.decodedToken.nameid)
        .subscribe((result: number) => {
          this.authService.changeShoppingCartCount(result);
        }, error => {
          this.alert.error(error);
        });
    }
  }

  productLiked(likedProduct: Product) {
    this.products.splice(this.products.indexOf(likedProduct), 1, likedProduct);
  }

}
