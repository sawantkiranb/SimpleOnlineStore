import { ShoppingCartService } from './_services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from './_services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'onlinestore-spa';
  jwtHelper = new JwtHelperService();

  constructor(public authService: AuthService, private cartService: ShoppingCartService, private alert: AlertService) { }

  ngOnInit() {

    const token = localStorage.getItem('token');

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);


      this.cartService.getCartCount(this.authService.decodedToken.nameid)
        .subscribe((result: number) => {
          this.authService.changeShoppingCartCount(result);
        }, error => {
          this.alert.error(error);
        });

    }

    console.log('app component');


  }

}
