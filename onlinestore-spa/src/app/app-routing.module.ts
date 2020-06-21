import { CheckoutComponent } from './checkout/checkout.component';
import { LikedProductsResolver } from './_resolvers/liked-products.resolver';
import { ShoppingCartComponent } from './products-list/shopping-cart/shopping-cart.component';
import { ProductDetailsResolver } from './_resolvers/product-details.resolver';
import { ProductDetailsComponent } from './products-list/product-details/product-details.component';
import { ProductListResolver } from './_resolvers/product-list.resolver';
import { WishListComponent } from './products-list/wish-list/wish-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartResolver } from './_resolvers/shopping-cart.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {
    path: 'products',
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        component: ProductsListComponent,
        resolve: { products: ProductListResolver },
      },
      {
        path: 'details/:id',
        component: ProductDetailsComponent,
        resolve: { product: ProductDetailsResolver }
      },
      {
        path: 'wishlist',
        component: WishListComponent,
        resolve: { products: LikedProductsResolver },
        canActivate: [AuthGuard]
      },
      {
        path: 'cart',
        component: ShoppingCartComponent,
        canActivate: [AuthGuard],
        resolve: { products: ShoppingCartResolver }
      }
    ]
  },
  { path: 'contact', component: ContactUsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
