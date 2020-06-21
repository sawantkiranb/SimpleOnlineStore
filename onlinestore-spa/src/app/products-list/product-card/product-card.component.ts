import { ProductService } from './../../_services/product.service';
import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { Product } from './../../_models/product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  @Output() likeProduct = new EventEmitter<Product>();

  constructor(private authService: AuthService, private productService: ProductService, private alert: AlertService, private router: Router) { }

  ngOnInit() {
  }

  like() {
    if (!this.authService.loggedIn()) {
      this.alert.error('You must login to move further');
      this.router.navigate(['']);
    } else {
      // Code to like
      this.productService.likeProduct(this.authService.decodedToken.nameid, this.product.id)
        .subscribe(response => {
          this.product.likes++;
          this.likeProduct.emit(this.product);
          this.alert.success('Product added to wishlist');
        }, error => {
          this.alert.error(error);
        });
    }
  }


}
