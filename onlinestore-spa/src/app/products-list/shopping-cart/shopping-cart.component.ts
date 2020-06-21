import { AuthService } from './../../_services/auth.service';
import { ShoppingCartService } from './../../_services/shopping-cart.service';
import { CartProduct } from './../../_models/cart-product';
import { AlertService } from './../../_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products: CartProduct[];
  cartItemCount: number;
  constructor(private authService: AuthService, private route: ActivatedRoute, private alert: AlertService) { }

  ngOnInit() {
    this.route.data
      .subscribe(result => {
        this.products = result.products;
        console.log(this.products);

      }, error => {
        this.alert.error(error);
      });

    this.authService.currentShoppingCartCount.subscribe(response => { this.cartItemCount = response; });
  }

  calculateTotal() {
    return (this.products.length > 0)
      ? this.products.map(a => a.price * a.quantity).reduce((a, c) => a + c)
      : 0;
  }

  itemRemoved(removedItem: CartProduct) {
    this.authService.changeShoppingCartCount(this.cartItemCount - removedItem.quantity);
    this.products.splice(this.products.indexOf(removedItem), 1);
  }

  quantityChanged(item: CartProduct) {
    this.products.splice(this.products.indexOf(item), 1, item);
    const count = this.products.map(a => a.quantity).reduce((a, c) => a + c);
    this.authService.changeShoppingCartCount(count);
  }

}
