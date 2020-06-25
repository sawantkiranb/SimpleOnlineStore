import { CartProduct } from './../../_models/cart-product';
import { AuthService } from './../../_services/auth.service';
import { ShoppingCartService } from './../../_services/shopping-cart.service';
import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { Product } from './../../_models/product';
import { AlertService } from './../../_services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  shoppingCartCount: number;
  constructor(private cartService: ShoppingCartService, private authService: AuthService, private alert: AlertService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.product = result.product;
    }, error => {
      this.alert.error(error);
    });


    this.authService.currentShoppingCartCount.subscribe(response => {
      this.shoppingCartCount = response;
    });

  }

  confirm(id): void {

    if (this.authService.loggedIn()) {

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { productId: id, },
        position: { top: '100px' },
        role: 'dialog'
      });

      dialogRef.afterClosed()
        .subscribe(result => {

          if (result !== undefined) {

            const cartItem: CartProduct = { productId: result, quantity: 1 };
            this.cartService.addToCart(this.authService.decodedToken.nameid, cartItem)
              .subscribe(response => {
                this.authService.changeShoppingCartCount(this.shoppingCartCount + 1);
                this.alert.success('Product added to cart');
              }, error => {
                this.alert.error(error);
              });
          }
        });

    } else {

      this.alert.error('You must login to move further');
      this.router.navigate(['/home']);
    }


  }

}
