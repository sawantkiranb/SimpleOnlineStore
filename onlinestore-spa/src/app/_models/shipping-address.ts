export interface ShippingAddress {
  contactName: string;
  mobile: string;
  pincode: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  isHome: boolean;
  isDefault: boolean;
  id?: number;
}
