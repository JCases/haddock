## Haddock Code Challenge

On top of helping restaurants manage their back of the house costs, we want to create a new product that allows them to handle takeaway and delivery orders. For our beta testing, we are working with a chinese restaurant, which for the moment offers only these products through our product:

| Number | Name                      | Price |
| ------ | ------------------------- | ----: |
| 12     | Spring rolls              | 4.50€ |
| 21     | Fried rice with pork      | 6.00€ |
| 37     | Chicken with almond sauce | 6.50€ |

A core part of theses solutions is offering discounts on food items to incentivize orders. There are several types of discounts currently active:

- 2-for-1 promotions (buy two of the same product, the second one is free). Currently applied on the spring rolls item (`12`).
- Spend X to save Y promotions (reach a certain amount on an order and you get a discount). Currently applied to orders over 20€, which get a 5€ discount.

_Extra question:_

- Menu pack promotion (buy one starter, one rice dish and one meat dish for a fixed price). Currently applied to a pack of rolls + rice + chicken (`12` + `21` + `37`) which sells for a fixed price of 14€.

An example interface for an implementation in Typescript would be:

```tsx
interface OrderHandler {
  add: (number: number, quantity: number) => void;
  getTotal: () => number;
}
```

The code should be written as if it would be part of a bigger piece of code which is already running in production, so we don't need it to be a full fledge standalone service. Example of usage:

```tsx
const orderHandler: OrderHandler = new MyOrderHandler();
orderHandler.add(12, 4);
orderHandler.add(21, 2);
const total = orderHandler.getTotal();
console.log(total); // 16.00€
```

When we are ready to expand, it should be very easy to add new products and configure discounts, so we need to make it all configurable using a json file.

### Things to do

- **DO** use the programming language and style you feel more comfortable with, it is not necessary to use Javascript or Typescript, although you can do so if you wish.
- **DO** include quality instructions, clarifying anything you feel is ambiguous and giving instructions on how to use the code. Write them as if it were to become a core part of Haddock and be read by many developers several times a week. But take into account that quality and length are not correlated.
- **DO** write modular and extendable code. How much existing code would you have to modify to change the data source from a JSON file to a database? Make sure the answer is not "a lot".
- **DO** write sensible tests that cover all of the expected behaviours and use cases. You can also add some comments where appropriate, but the code paired with the tests should be mostly self-documenting.

### Things not to do

- **DO NOT** go out of the scope of this requirements. Make sure you understand what is being asked of you, asking for clarification where necessary.
- **DO NOT** write overly complex solutions, use incosistent styling, or try to force design patterns where they are not needed. The code should be nice to look at, and understandable at a glance.
