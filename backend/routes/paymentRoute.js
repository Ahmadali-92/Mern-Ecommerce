const express = require("express");
let {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
let router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
