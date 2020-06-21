import { Photo } from './photo';
export interface Product {
  id: number;
  serialNo: string;
  name: string;
  stock: number;
  price: number;
  photoUrl: string;
  shortDescription: string;

  category?: string;
  description?: string;
  photos?: Photo[];
  likes?: number;

}
