import { AuthService } from './../_services/auth.service';
import { AddressService } from './../_services/address.service';
import { AlertService } from './../_services/alert.service';
import { ShippingAddress } from './../_models/shipping-address';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { MatDialog } from '@angular/material/dialog';
import { CartProduct } from '../_models/cart-product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  addresses: ShippingAddress[];

  address: ShippingAddress = {
    address: '',
    city: '',
    contactName: '',
    isDefault: false,
    isHome: false,
    locality: '',
    mobile: '',
    pincode: '',
    state: ''
  };


  products: CartProduct[];
  constructor(private addressService: AddressService, private authService: AuthService, private alert: AlertService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.products = this.route.snapshot.data.products;
    console.log('products', this.products);

    this.addresses = this.route.snapshot.data.addresses;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditAddressComponent, {
      width: '500px',
      data: { address: this.address, editMode: false },
      position: { top: '100px' },
      role: 'dialog'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        this.address = result.address;
        // Code to add new address

        this.addressService.addAddress(this.authService.decodedToken.nameid, this.address)
          .subscribe((response: ShippingAddress) => {

            if (response.isDefault) {
              this.addresses.every(address => {
                address.isDefault = false;
              });

              this.addresses.unshift(response);
            } else {
              this.addresses.push(response);
            }

            this.alert.success('Successful address creation');
          }, error => {
            this.alert.error(error);
          });

      }

      console.log('The dialog was closed');
    });
  }

}
