const braintree = require("braintree");

function createBraintreePayment(
  amountPayment,
  cardHolderName,
  cardNumber,
  expirationMonth,
  expirationYear,
  cvv
) {
  return new Promise((resolve, reject) => {
    const gateway = new braintree.BraintreeGateway({
      environment: braintree.Environment.Sandbox, // Change to Production for live
      merchantId: process.env.BRAINTREE_MERCHANT_ID,
      publicKey: process.env.BRAINTREE_PUBLIC_KEY,
      privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    });

    // Create payment payload
    const paymentData = {
      amount: amountPayment,
      paymentMethodNonce: "fake-valid-nonce", // Replace with actual nonce in production
      options: {
        submitForSettlement: true,
      },
    };

    // Create Braintree payment
    gateway.transaction.sale(paymentData, (error, result) => {
      if (error) {
        console.log("Braintree Error:", error);
        reject(error);
      } else if (!result.success) {
        console.log("Braintree Error: Payment failed", result.message);
        reject(result.message);
      } else {
        // Resolve with payment details on success
        resolve(result);
      }
    });
  });
}

module.exports = createBraintreePayment;
