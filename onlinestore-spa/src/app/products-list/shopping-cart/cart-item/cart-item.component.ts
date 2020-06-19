import { AlertService } from './../../../_services/alert.service';
import { AuthService } from './../../../_services/auth.service';
import { ShoppingCartService } from './../../../_services/shopping-cart.service';
import { CartProduct } from './../../../_models/cart-product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  sortSelectedValue: number;
  quantityList: any[] = [
    { value: 1, displayName: '1' },
    { value: 2, displayName: '2' },
    { value: 3, displayName: '3' },
    { value: 4, displayName: '4' },
    { value: 5, displayName: '5' }
  ];

  @Input() product: CartProduct;
  @Output() removeItem = new EventEmitter<CartProduct>();
  @Output() changeQuantity = new EventEmitter<CartProduct>();

  constructor(private cartService: ShoppingCartService, private authService: AuthService, private alert: AlertService) { }

  ngOnInit() {
  }

  deleteCartItem() {
    this.cartService.deleteCartItem(this.authService.decodedToken.nameid, this.product.id)
      .subscribe(() => {
        this.removeItem.emit(this.product);
        this.alert.success('Product removed from shopping cart');
      }, error => {
        this.alert.error(error);
      });
  }

  updateQuantity(item) {
    console.log(item.value);

    const cartItem: CartProduct = { productId: this.product.productId, quantity: item.value };
    this.cartService.addToCart(this.authService.decodedToken.nameid, cartItem)
      .subscribe(() => {
        this.product.quantity = item.value;
        this.changeQuantity.emit(this.product);
      }, error => {
        this.alert.error(error);
      });
  }
}
