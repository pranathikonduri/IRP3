"use strict";

const cart = [
  { id: 101, name: "Laptop", price: 50000, quantity: 1, category: "Electronics" },
  { id: 102, name: "Mouse", price: 800, quantity: 2, category: "Accessories" },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, category: "Accessories" },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, category: "Electronics" },
  { id: 105, name: "Headphones", price: 2500, quantity: 2, category: "Accessories" },
];

const cartLines = cart.map(({ name, price, quantity }) => ({
  name,
  totalItemPrice: price * quantity,
}));
const productsAbove2000 = cart.filter((product) => product.price > 2000);
const totalCartValue = cart.reduce(
  (total, product) => total + product.price * product.quantity,
  0,
);
const electronicsTotal = cart
  .filter((product) => product.category === "Electronics")
  .reduce((total, product) => total + product.price * product.quantity, 0);

console.log("Product totals:", cartLines);
console.log(
  "Products priced above ₹2,000:",
  productsAbove2000.map((product) => product.name),
);
console.log("Total cart value:", totalCartValue);
console.log("Electronics total:", electronicsTotal);
console.log("Cart items:");
cart.forEach(({ name, category, quantity }) =>
  console.log(`${name} | ${category} | quantity: ${quantity}`),
);

const inventory = new Map(
  cart.map((product) => [product.id, { ...product }]),
);
console.log("\nInventory product 101:", inventory.get(101));
inventory.get(101).quantity += 1;
inventory.delete(104);
console.log("Inventory after update and delete:");
inventory.forEach((product, id) => console.log(id, product));

const emails = [
  "rahul@gmail.com",
  "priya@gmail.com",
  "rahul@gmail.com",
  "arjun@gmail.com",
  "priya@gmail.com",
];
const uniqueEmails = [...new Set(emails)];
console.log("\nUnique emails:", uniqueEmails);

const productConfig = { name: "Laptop", price: 50000, stock: 20 };
const frozenConfig = Object.freeze({ ...productConfig });
const sealedConfig = Object.seal({ ...productConfig });

console.log("\nFrozen object mutation results:");
console.log("Change price:", Reflect.set(frozenConfig, "price", 45000));
console.log("Add property:", Reflect.set(frozenConfig, "color", "silver"));
console.log("Delete property:", Reflect.deleteProperty(frozenConfig, "stock"));
console.log("Frozen object:", frozenConfig);

console.log("\nSealed object mutation results:");
console.log("Change price:", Reflect.set(sealedConfig, "price", 45000));
console.log("Add property:", Reflect.set(sealedConfig, "color", "silver"));
console.log("Delete property:", Reflect.deleteProperty(sealedConfig, "stock"));
console.log("Sealed object:", sealedConfig);
