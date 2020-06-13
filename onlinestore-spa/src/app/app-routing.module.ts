import { WishListComponent } from './products-list/wish-list/wish-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'wishlist', component: WishListComponent },
    ]
  },
  { path: 'products', component: ProductsListComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
