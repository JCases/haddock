export interface OrderHandler {
  add: (number: number, quantity: number) => void;
  getTotal: () => number;
}