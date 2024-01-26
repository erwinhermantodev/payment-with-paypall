// createBraintreePayment.test.js
const sinon = require("sinon");

describe("createBraintreePayment", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should resolve with payment details on successful payment", async () => {
    // Dynamically import Chai using import()
    const chai = await import("chai");
    const { expect } = chai;

    // Mock the BraintreeGateway and other necessary dependencies
    const BraintreeGateway = require("braintree").BraintreeGateway;
    const gateway = new BraintreeGateway({
      /* your configuration */
    });
    sandbox.stub(require("braintree"), "BraintreeGateway").returns(gateway);

    // Mock the successful result from Braintree
    const successfulResult = { success: true };
    sandbox
      .stub(gateway.transaction, "sale")
      .callsArgWith(1, null, successfulResult);

    // Your actual test logic here
    const result =
      await createBraintreePayment(/* provide necessary parameters */);

    // Assertions
    expect(result).to.deep.equal(successfulResult);
  });

  it("should reject with an error on payment failure", async () => {
    // Dynamically import Chai using import()
    const chai = await import("chai");
    const { expect } = chai;

    // Mock the BraintreeGateway and other necessary dependencies
    const BraintreeGateway = require("braintree").BraintreeGateway;
    const gateway = new BraintreeGateway({
      /* your configuration */
    });
    sandbox.stub(require("braintree"), "BraintreeGateway").returns(gateway);

    // Mock a failed result from Braintree
    const failedResult = { success: false, message: "Payment failed" };
    sandbox
      .stub(gateway.transaction, "sale")
      .callsArgWith(1, null, failedResult);

    // Your actual test logic here
    try {
      await createBraintreePayment(/* provide necessary parameters */);
      // If it doesn't throw an error, fail the test
      throw new Error("Expected rejection, but promise was resolved");
    } catch (error) {
      // Assertions
      expect(error.message).to.equal("Payment failed");
    }
  });

  it("should reject with an error on gateway error", async () => {
    // Dynamically import Chai using import()
    const chai = await import("chai");
    const { expect } = chai;

    // Mock the BraintreeGateway and other necessary dependencies
    const BraintreeGateway = require("braintree").BraintreeGateway;
    const gateway = new BraintreeGateway({
      /* your configuration */
    });
    sandbox.stub(require("braintree"), "BraintreeGateway").returns(gateway);

    // Mock a generic error from Braintree
    const genericError = new Error("Gateway error");
    sandbox
      .stub(gateway.transaction, "sale")
      .callsArgWith(1, genericError, null);

    // Your actual test logic here
    try {
      await createBraintreePayment(/* provide necessary parameters */);
      // If it doesn't throw an error, fail the test
      throw new Error("Expected rejection, but promise was resolved");
    } catch (error) {
      // Assertions
      expect(error.message).to.equal("Gateway error");
    }
  });
});
