export interface CartProduct {
  productId: number;
  quantity: number;

  id?: number;
  userId?: number;
  productName?: string;
  shortDescription?: string;
  photoUrl?: string;
  price?: number;
  totalPrice?: number;
}
