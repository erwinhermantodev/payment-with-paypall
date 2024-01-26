const paypal = require("paypal-rest-sdk");

function setupPaypal() {
  // PayPal configuration
  paypal.configure({
    mode: process.env.PAYPAL_MODE, // Change to 'live' for production
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
  });
}

module.exports = { setupPaypal };
