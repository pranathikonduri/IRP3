"use strict";

class Product {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}

const customer = { name: "Rahul", email: "rahul@gmail.com" };
const { name: customerName, email } = customer;
const products = [
  new Product(1, "Laptop", 50000, 1),
  new Product(2, "Mouse", 1000, 2),
  new Product(3, "Monitor", 15000, 1),
  new Product(4, "Keyboard", 2000, 1),
];

const productTotals = products.map((product) => ({
  name: product.name,
  total: product.getTotal(),
}));
const highValueProducts = products.filter((product) => product.price > 5000);
const orderTotal = productTotals.reduce((total, product) => total + product.total, 0);
const uniqueProductIds = new Set(products.map(({ id }) => id));
const inventory = new Map(
  products.map((product) => [product.id, { ...product }]),
);
const orderConfig = Object.freeze({
  currency: "INR",
  status: "Processing",
});

const order = {
  orderId: 501,
  customer: { name: customerName, email },
  products: productTotals,
  total: orderTotal,
  currency: orderConfig.currency,
};
const serializedOrder = JSON.stringify(order);

async function confirmOrder() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Order Status: Confirmed Successfully!");
  } catch (error) {
    console.error(`Order Status: Confirmation failed - ${error.message}`);
  }
}

async function printOrderSummary() {
  console.log("====== QUICKCART ORDER SUMMARY ======");
  console.log(`Customer: ${customerName}`);
  console.log("Products:");
  productTotals.forEach(({ name, total }) =>
    console.log(`${name.padEnd(10)} - ₹ ${total}`),
  );
  console.log(`Total Order Amount: ₹ ${orderTotal}`);
  console.log(`Unique Products: ${uniqueProductIds.size}`);
  console.log(`High-value products (> ₹5,000): ${highValueProducts.length}`);
  console.log(`Inventory items: ${inventory.size}`);
  console.log("Serialized order:", serializedOrder);
  console.log(`Order Status: ${orderConfig.status}...`);
  await confirmOrder();
  console.log("=====================================");
}

printOrderSummary().catch((error) => {
  console.error("Could not build order summary:", error);
  process.exitCode = 1;
});
