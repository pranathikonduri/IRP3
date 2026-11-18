"use strict";

{
  function Product(productName, price, category) {
    this.productName = productName;
    this.price = price;
    this.category = category;
  }

  Product.prototype.displayProduct = function () {
    return `${this.productName} - ₹${this.price} (${this.category})`;
  };

  const products = [
    new Product("Laptop", 50000, "Electronics"),
    new Product("Mouse", 800, "Accessories"),
    new Product("Monitor", 12000, "Electronics"),
  ];

  console.log("Prototype-based products:");
  products.forEach((product) => console.log(product.displayProduct()));
}

{
  class Product {
    constructor(productName, price, category) {
      this.productName = productName;
      this.price = price;
      this.category = category;
    }

    getProductDetails() {
      return `${this.productName} - ₹${this.price} (${this.category})`;
    }
  }

  class ElectronicProduct extends Product {
    constructor(productName, price, brand) {
      super(productName, price, "Electronics");
      this.brand = brand;
    }

    getWarrantyLabel() {
      return `${this.brand} warranty included`;
    }
  }

  class ClothingProduct extends Product {
    constructor(productName, price, size) {
      super(productName, price, "Clothing");
      this.size = size;
    }

    getSizeLabel() {
      return `Size: ${this.size}`;
    }
  }

  const laptop = new ElectronicProduct("Laptop", 50000, "QuickTech");
  const shirt = new ClothingProduct("T-shirt", 1200, "M");

  console.log("\nES6 classes:");
  console.log(laptop.getProductDetails(), "-", laptop.getWarrantyLabel());
  console.log(shirt.getProductDetails(), "-", shirt.getSizeLabel());
}

const finalPrice = (price, discountPercentage) =>
  price - (price * discountPercentage) / 100;
const customer = { name: "Rahul", email: "rahul@gmail.com", city: "Mumbai" };
const { name, email } = customer;
const calculateTotal = (...prices) =>
  prices.reduce((total, price) => total + price, 0);
const originalProduct = { productName: "Laptop", price: 50000 };
const discountedProduct = { ...originalProduct, price: finalPrice(50000, 10) };
const confirmation =
  `Hello Rahul, your order of Laptop is confirmed. Total: ₹ 50000.`;

console.log("\nCheckout syntax:");
console.log("Price after 10% discount:", finalPrice(50000, 10));
console.log(confirmation);
console.log("Customer:", name, email);
console.log("Total:", calculateTotal(50000, 800, 1500));
console.log("Original product:", originalProduct);
console.log("Copied product:", discountedProduct);
