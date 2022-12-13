import { Discount, Product } from "..";

export interface Cart {
  products: Product[];
  discounts: Discount[];
}