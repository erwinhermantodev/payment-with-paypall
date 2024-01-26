const createPaypalPayment = require("./paypal");
const createBraintreePayment = require("./braintree");
const { saveOrderToDatabase, getOrdersFromDatabase } = require("./database");

function setup(app) {
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  app.post("/processPayment", async (req, res) => {
    const {
      amount,
      currency,
      fullName,
      cardHolderName,
      cardNumber,
      expirationMonth,
      expirationYear,
      cvv,
    } = req.body;

    try {
      // Determine payment gateway based on rules
      const paymentGateway =
        currency === "USD" || currency === "EUR" || currency === "AUD"
          ? "paypal"
          : "braintree";

      // Create payment
      const paymentResult =
        paymentGateway === "paypal"
          ? await createPaypalPayment(
              amount,
              currency,
              cardNumber,
              expirationMonth,
              expirationYear,
              cvv
            )
          : await createBraintreePayment(
              amount,
              cardHolderName,
              cardNumber,
              expirationMonth,
              expirationYear,
              cvv
            );

      // Save order data and payment response to the database
      const order = {
        amount,
        currency,
        fullName,
        paymentGateway,
        paymentResult,
      };

      const orderId = await saveOrderToDatabase(order);

      // Respond with success message
      res
        .status(200)
        .json({ success: true, message: "Payment successful!", orderId });
    } catch (error) {
      // Respond with error message
      res.status(500).json({
        success: false,
        message: "Payment failed!",
        error: error.message,
      });
    }
  });
}

module.exports = { setup };
