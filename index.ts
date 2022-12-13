import { orderHandler } from "./src/orderHandler";

orderHandler.add(12, 4);
orderHandler.add(21, 2);
const total = orderHandler.getTotal();

console.log(total); // 16.00€