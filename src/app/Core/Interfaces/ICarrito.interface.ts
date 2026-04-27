import { Product } from "./IProduct.interface";

export interface CartItem {
  product: Product;
  quantity: number;
}
