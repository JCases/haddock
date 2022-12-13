import Decimal from 'decimal.js';

import { SubTypeDiscount, TypeDiscount } from "..";

export interface Discount {
  type: TypeDiscount;
  name: string;
  subtype: SubTypeDiscount,
  promotion: Decimal;
}

export interface DiscountProduct extends Discount {
  type: TypeDiscount.PRODUCT;
  products: number[];
  priority: number;
}

export interface DiscountOrder extends Discount {
  type: TypeDiscount.ORDER;
  required: Decimal;
}

