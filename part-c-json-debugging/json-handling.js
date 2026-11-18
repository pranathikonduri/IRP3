"use strict";

const order = {
  orderId: 501,
  customer: "Rahul",
  amount: 5000,
  deliveryDate: undefined,
  discount: null,
  calculateTax() {
    return 500;
  },
};

const serializedOrder = JSON.stringify(order);
const parsedOrder = JSON.parse(serializedOrder);
console.log("Serialized order:", serializedOrder);
console.log("Parsed order:", parsedOrder);
console.log(
  "Lost properties:",
  ["deliveryDate", "calculateTax"].filter(
    (property) => !(property in parsedOrder),
  ),
);

console.log("\nJSON output predictions:");
console.log("Q1:", JSON.stringify({ name: "Rahul", age: undefined }));
console.log("Q2:", JSON.stringify([10, undefined, 30]));
console.log("Q3:", JSON.stringify({ price: NaN, discount: Infinity }));

try {
  JSON.parse("{name: 'Rahul', age: 25}");
} catch (error) {
  console.log("Q4: SyntaxError -", error.message);
}

const user = { name: "Rahul" };
user.self = user;
try {
  JSON.stringify(user);
} catch (error) {
  console.log("Q5: TypeError -", error.message);
}

console.log(
  "Q6:",
  JSON.stringify({ createdAt: new Date("2026-01-01") }),
);
