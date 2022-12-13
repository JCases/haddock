import * as dotenv from 'dotenv';
dotenv.config();

import { readFileSync, existsSync } from 'fs';
import path from 'path';

import { Discount, DiscountOrder, DiscountProduct, Product, TypeDiscount } from '../shared';

class Database {
  private menu = process.env.MENU_JSON;
  private discount = process.env.DISCOUNT_JSON;

  getProduct(id: number): Product {
    const products = this.read("MENU") as Product[];
    return products.find(p => p.number === id);
  }

  getDiscountsProduct() {
    const discounts = this.read("DISCOUNT_PRODUCT") as DiscountProduct[];
    return discounts;
  }

  getDiscountsOrder() {
    const discounts = this.read("DISCOUNT_ORDER") as DiscountOrder[];
    return discounts;
  }

  private read(from: "MENU" | "DISCOUNT_PRODUCT" | "DISCOUNT_ORDER") {
    const file = from === "MENU" ? path.join(__dirname, this.menu) : path.join(__dirname, this.discount);

    if (!existsSync(file))
      throw new Error(`${from} not found`)

    try {
      const items = JSON.parse(readFileSync(file, 'utf-8'));

      if (from === "MENU") return items as Product[];

      if (from === "DISCOUNT_PRODUCT") return (items as Discount[]).filter(i => i.type === TypeDiscount.PRODUCT) as DiscountProduct[]
      return (items as Discount[]).filter(i => i.type === TypeDiscount.ORDER) as DiscountOrder[]

    } catch (e) {
      throw new Error(`${from} not found \n ${e}`);
    }
  }
}

const database = new Database();
export const db = database;