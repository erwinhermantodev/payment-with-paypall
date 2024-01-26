const paypal = require("paypal-rest-sdk");
const { setupPaypal } = require("./config");

function createPaypalPayment(
  amount,
  currency,
  cardNumber,
  expirationMonth,
  expirationYear,
  cvv
) {
  return new Promise((resolve, reject) => {
    setupPaypal();

    const paymentData = {
      intent: "sale",
      payer: {
        payment_method: "credit_card",
        funding_instruments: [
          {
            credit_card: {
              number: cardNumber,
              type: "visa", // You may need to determine card type dynamically
              expire_month: expirationMonth,
              expire_year: expirationYear,
              cvv2: cvv,
            },
          },
        ],
      },
      transactions: [
        {
          amount: {
            total: amount,
            currency: currency,
          },
          description: "Payment description",
        },
      ],
    };

    // Create PayPal payment
    paypal.payment.create(paymentData, (error, payment) => {
      if (error) {
        console.log("PayPal Error:", error.response);
        reject(error);
      } else {
        // Resolve with payment details on success
        resolve(payment);
      }
    });
  });
}

module.exports = createPaypalPayment;
