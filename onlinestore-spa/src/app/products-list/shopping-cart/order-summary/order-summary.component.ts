import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  @Input() cartTotal: number;
  orderSummaryConfig: any = environment.orderSummaryConfig;

  constructor() { }

  ngOnInit() {
  }

  calculateDiscount() {
    const cartTotal = this.cartTotal;
    return cartTotal * (this.orderSummaryConfig.discount / 100);
  }

  calculateOrderTotal() {
    return this.cartTotal + this.orderSummaryConfig.deliveryCharges - this.calculateDiscount();
  }

}
