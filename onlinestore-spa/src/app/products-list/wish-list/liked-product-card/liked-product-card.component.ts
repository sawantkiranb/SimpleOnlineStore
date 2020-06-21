import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from './../../../_services/auth.service';
import { ProductService } from './../../../_services/product.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LikedProduct } from 'src/app/_models/liked-product';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-liked-product-card',
  templateUrl: './liked-product-card.component.html',
  styleUrls: ['./liked-product-card.component.css']
})
export class LikedProductCardComponent implements OnInit {
  @Input() product: LikedProduct;
  @Output() dislikeProduct = new EventEmitter<Product>();

  constructor(private productService: ProductService, private authService: AuthService, private alert: AlertService) { }

  ngOnInit() {
  }

  dislike() {
    this.productService.dislikeProduct(this.authService.decodedToken.nameid, this.product.productId)
      .subscribe(response => {
        this.dislikeProduct.emit(this.product);
        this.alert.success('Product removed from wishlist');
      }, error => {
        this.alert.error(error);
      });
  }


}
