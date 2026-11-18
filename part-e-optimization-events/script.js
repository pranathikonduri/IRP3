"use strict";

function debounce(callback, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

function throttle(callback, delay) {
  let lastRun = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastRun >= delay) {
      lastRun = now;
      callback(...args);
    }
  };
}

function calculateDiscount(price, percentage) {
  return price - (price * percentage) / 100;
}

function memoize(callback) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("Discount result came from cache.");
      return cache.get(key);
    }

    const result = callback(...args);
    cache.set(key, result);
    console.log("Discount result freshly calculated.");
    return result;
  };
}

const searchInput = document.querySelector("#search-input");
const searchStatus = document.querySelector("#search-status");
const runSearch = debounce((query) => {
  searchStatus.textContent = query
    ? `Searching for "${query}"...`
    : "Enter a product name to search.";
  console.log("Search:", query);
}, 500);

searchInput.addEventListener("input", (event) => {
  runSearch(event.target.value.trim());
});

const bubbleDemo = document.querySelector("#bubble-demo");
bubbleDemo.addEventListener("click", (event) => {
  console.log("Parent handler ran (event bubbling).", {
    target: event.target,
    currentTarget: event.currentTarget,
  });
});
bubbleDemo.querySelector('[data-bubble="stop"]').addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("Button handler ran; propagation stopped.");
});

const productList = document.querySelector("#product-list");
const listStatus = document.querySelector("#list-status");
productList.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const removeButton = event.target.closest('button[data-action="remove"]');
  if (!removeButton || !productList.contains(removeButton)) {
    return;
  }

  const productItem = removeButton.closest("li");
  const productName = productItem.querySelector("span").textContent;
  productItem.remove();
  listStatus.textContent = `${productName} removed.`;
});

const memoizedDiscount = memoize(calculateDiscount);
const discountButton = document.querySelector("#discount-button");
const discountStatus = document.querySelector("#discount-status");
discountButton.addEventListener("click", () => {
  const firstResult = memoizedDiscount(5000, 10);
  const secondResult = memoizedDiscount(5000, 10);
  discountStatus.textContent = `Discounted price: ₹${firstResult} (second result: ₹${secondResult}).`;
});

const scrollStatus = document.querySelector("#scroll-status");
let scrollCount = 0;
window.addEventListener(
  "scroll",
  throttle(() => {
    scrollCount += 1;
    scrollStatus.textContent = `Scroll handler runs: ${scrollCount}`;
  }, 1000),
);
