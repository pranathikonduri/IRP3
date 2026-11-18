"use strict";

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

function validateOrder(callback) {
  setTimeout(() => {
    console.log("Order Validated");
    callback();
  }, 1000);
}

function processPayment(callback) {
  setTimeout(() => {
    console.log("Payment Completed");
    callback();
  }, 1000);
}

function sendConfirmation(callback) {
  setTimeout(() => {
    console.log("Confirmation Sent");
    callback();
  }, 1000);
}

function runCallbackSequence() {
  return new Promise((resolve) => {
    validateOrder(() => {
      processPayment(() => {
        sendConfirmation(resolve);
      });
    });
  });
}

function validateOrderPromise() {
  return wait(1000).then(() => {
    console.log("Order Validated");
  });
}

function processPaymentPromise(shouldFail = false) {
  return wait(1000).then(() => {
    if (shouldFail) {
      throw new Error("Payment Failed");
    }
    console.log("Payment Completed");
  });
}

function sendConfirmationPromise() {
  return wait(1000).then(() => {
    console.log("Confirmation Sent");
  });
}

async function placeOrder(paymentFails = false) {
  try {
    await validateOrderPromise();
    await processPaymentPromise(paymentFails);
    await sendConfirmationPromise();
    console.log("Order Status: Confirmed Successfully!");
  } catch (error) {
    console.error(`Order Status: Failed - ${error.message}`);
  }
}

function productsAPI() {
  return wait(1000).then(() => "Products Loaded");
}

function paymentAPI() {
  return wait(1500).then(() => {
    throw new Error("Payment Service Failed");
  });
}

function deliveryAPI() {
  return wait(2000).then(() => "Delivery Loaded");
}

async function runPromiseCombinators() {
  console.log("\nPromise.all():");
  try {
    const results = await Promise.all([
      productsAPI(),
      paymentAPI(),
      deliveryAPI(),
    ]);
    console.log(results);
  } catch (error) {
    console.log("One request failed:", error.message);
  }

  console.log("\nPromise.allSettled():");
  console.log(
    await Promise.allSettled([
      productsAPI(),
      paymentAPI(),
      deliveryAPI(),
    ]),
  );

  console.log("\nPromise.race():");
  try {
    console.log(
      await Promise.race([productsAPI(), paymentAPI(), deliveryAPI()]),
    );
  } catch (error) {
    console.log("First settled request rejected:", error.message);
  }

  console.log("\nPromise.any():");
  try {
    console.log(
      await Promise.any([productsAPI(), paymentAPI(), deliveryAPI()]),
    );
  } catch (error) {
    console.log("Every request failed:", error.errors);
  }
}

console.log("Event loop order:");
console.log("Order Started");
setTimeout(() => console.log("Payment Processing"), 0);
Promise.resolve().then(() => console.log("Payment Successful"));
console.log("Order Completed");

async function runOrderExamples() {
  console.log("\nCallback sequence:");
  await runCallbackSequence();
  console.log("Callback order complete");

  console.log("\nPromise chain:");
  await validateOrderPromise()
    .then(() => processPaymentPromise())
    .then(() => sendConfirmationPromise())
    .then(() => console.log("Promise order complete"))
    .catch((error) => console.error("Promise order failed:", error.message));

  console.log("\nAsync/await success:");
  await placeOrder();
  console.log("\nAsync/await failure:");
  await placeOrder(true);
  await runPromiseCombinators();
}

setTimeout(() => {
  runOrderExamples().catch((error) => {
    console.error("Unexpected order-processing error:", error);
    process.exitCode = 1;
  });
}, 0);
