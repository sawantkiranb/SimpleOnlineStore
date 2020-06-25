import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShippingAddress } from './../../_models/shipping-address';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})

export class EditAddressComponent implements OnInit {

  editAddressForm: FormGroup;
  address: ShippingAddress;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditAddressComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.address = this.data.address;
    this.initializeForm();
  }

  private initializeForm() {
    this.editAddressForm = this.fb.group({
      contactName: [this.address.contactName, Validators.required],
      mobile: [this.address.mobile, Validators.required],
      pincode: [this.address.pincode, Validators.required],
      address: [this.address.address, Validators.required],
      locality: [this.address.locality, Validators.required],
      city: [this.address.city, Validators.required],
      state: [this.address.state, Validators.required],
      isDefault: [this.address.isDefault, Validators.required],
      isHome: [this.address.isHome, Validators.required]
    });
  }
}
