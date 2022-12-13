import Decimal from 'decimal.js';

export interface Product {
  number: number;
  name: string;
  price: Decimal;
  discountActive: boolean;
}