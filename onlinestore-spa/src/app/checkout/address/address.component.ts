import { AuthService } from './../../_services/auth.service';
import { AlertService } from './../../_services/alert.service';
import { AddressService } from './../../_services/address.service';
import { EditAddressComponent } from './../edit-address/edit-address.component';
import { ShippingAddress } from './../../_models/shipping-address';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @Input() addresses: ShippingAddress[];
  selectedAddress: number;

  shippingAddress: ShippingAddress;

  constructor(private addressService: AddressService, private authService: AuthService, private alert: AlertService, public dialog: MatDialog) { }

  openDialog(address: ShippingAddress): void {

    const addressToEdit: ShippingAddress = Object.assign({}, address);

    const dialogRef = this.dialog.open(EditAddressComponent, {
      width: '500px',
      data: { address: addressToEdit, editMode: true },
      position: { top: '100px' },
      role: 'dialog'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        this.shippingAddress = result.address;

        // Code to update address
        this.addressService.updateAddress(this.authService.decodedToken.nameid, this.shippingAddress)
          .subscribe(() => {


            if (this.shippingAddress.isDefault) {

              this.addresses.every(item => {
                item.isDefault = false;
              });

              this.addresses.splice(this.addresses.indexOf(this.shippingAddress), 1);
              this.addresses.unshift(this.shippingAddress);

            } else {
              this.addresses.splice(this.addresses.indexOf(this.shippingAddress), 1, this.shippingAddress);
            }

            this.alert.success('Successful address updation');
          }, error => {
            this.alert.error(error);
          });

      }

      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.selectedAddress = this.addresses.find(a => a.isDefault).id;
  }

  deleteAddress(address) {
    this.addressService.deleteAddress(this.authService.decodedToken.nameid, address.id)
      .subscribe(() => {
        this.addresses.splice(this.addresses.indexOf(address), 1);
        this.alert.success('Address removed successfully');
      }, error => {
        this.alert.error(error);
      });
  }

}
