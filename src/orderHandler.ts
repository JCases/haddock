import Decimal from "decimal.js";

import { Cart, OrderHandler, SubTypeDiscount } from "./shared";

import { db } from './db'

class MyOrderHandler implements OrderHandler {

  private cart: Cart;

  constructor() {
    this.cart = {
      products: [],
      discounts: [],
    }
  }

  add(number: number, quantity: number) {
    const product = db.getProduct(number);
    if (!product) return;

    for (let i = 0; i < quantity; i++)
      this.cart.products.push({ ...product, discountActive: false });
  }

  getTotal() {
    const discounts = db.getDiscountsOrder();
    this.setDiscounts();
    const total = this.cart.products.map(p => p.price).reduce((acc, value) => Decimal.sum(acc, value));

    const discountFiltered = discounts.filter(d => d.required <= total);

    const discountToApply = discountFiltered.length ? discountFiltered.reduce((prev, current) => (prev.promotion > current.promotion) ? prev : current) : null;
    this.cart.discounts.push(discountToApply);

    return discountToApply ? Decimal.sub(total, discountToApply.promotion).toNumber() : new Decimal(total).toNumber();
  }

  private setDiscounts() {
    const discounts = db.getDiscountsProduct();

    const discountsPriority = discounts.sort((a, b) => a.priority - b.priority);

    for (const discount of discountsPriority) {
      const productsWithoutDiscounts = this.cart.products.filter(p => !p.discountActive);

      switch (discount.subtype) {
        case SubTypeDiscount.FREE:
          const freeProductAvailable = productsWithoutDiscounts.filter(p => discount.products.includes(p.number));

          // Set the second product to price 0
          freeProductAvailable.map((d, i, a) => {
            if ((i + 1) % 2 === 0) {
              d.price = new Decimal(0);
              d.discountActive = true;
            } else d.discountActive = true;
          });
          break;
        case SubTypeDiscount.PACK:
          const packProductAvailable = productsWithoutDiscounts.filter(p => discount.products.includes(p.number));

          const countProducts: number[] = [];
          for (const product of discount.products)
            countProducts.push(packProductAvailable.filter(p => p.number === product).length);

          const minUnits = Math.min(...countProducts);

          const productsByDiscounts = discount.products.map(d => packProductAvailable.filter(p => p.number === d));

          // Only works if menu contains 1 - 1 - 1 products

          let count = 0;
          productsByDiscounts.map(pd => {
            pd.map(p => {
              if (p.number !== discount.products[0] && count < minUnits) {
                p.price = new Decimal(0);
                p.discountActive = true;
                count++;
              }
              if (p.number === discount.products[0] && count < minUnits) {
                p.price = discount.promotion;
                p.discountActive = true;
                count++;
              }
            });
            count = 0;
          });

          break;
      }
    }
  }
}

export const orderHandler = new MyOrderHandler();
