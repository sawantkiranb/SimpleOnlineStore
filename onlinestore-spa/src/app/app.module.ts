import { AddressComponent } from './checkout/address/address.component';
import { NegativeNumberPipe } from './_pipes/negative-number.pipe';
import { OrderSummaryComponent } from './products-list/shopping-cart/order-summary/order-summary.component';
import { LikedProductCardComponent } from './products-list/wish-list/liked-product-card/liked-product-card.component';
import { WishListComponent } from './products-list/wish-list/wish-list.component';
import { CartItemComponent } from './products-list/shopping-cart/cart-item/cart-item.component';
import { ShoppingCartComponent } from './products-list/shopping-cart/shopping-cart.component';

import { ProductDetailsResolver } from './_resolvers/product-details.resolver';
import { ProductDetailsComponent } from './products-list/product-details/product-details.component';
import { ProductListResolver } from './_resolvers/product-list.resolver';
import { ProductCardComponent } from './products-list/product-card/product-card.component';
import { ErrorInterceptorService } from './_services/error-interceptor.service';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsListComponent } from './products-list/products-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ShoppingCartResolver } from './_resolvers/shopping-cart.resolver';
import { LikedProductsResolver } from './_resolvers/liked-products.resolver';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressResolver } from './_resolvers/address.resolver';
import { EditAddressComponent } from './checkout/edit-address/edit-address.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProductsListComponent,
    ContactUsComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ConfirmDialogComponent,
    ShoppingCartComponent,
    CartItemComponent,
    WishListComponent,
    LikedProductCardComponent,
    CheckoutComponent,
    OrderSummaryComponent,
    AddressComponent,
    EditAddressComponent,
    NegativeNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    ProductListResolver,
    ProductDetailsResolver,
    ShoppingCartResolver,
    LikedProductsResolver,
    AddressResolver
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
