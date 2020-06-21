import { LikedProduct } from './../../_models/liked-product';
import { AlertService } from './../../_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  products: LikedProduct[];
  sortSelectedValue = 'new';

  sortList: any[] = [
    { value: 'new', displayName: 'New First' },
    { value: 'pricehtl', displayName: 'Price: High To Low' },
    { value: 'pricelth', displayName: 'Price: Low To High' },
  ];

  constructor(private authServie: AuthService, private alert: AlertService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.products = result.products;
      console.log(this.products);
    }, error => {
      this.alert.error(error);
    });
  }

  productDisliked(product: LikedProduct) {
    console.log('disliked product:', product);
    this.products.splice(this.products.indexOf(product), 1);
  }

}
