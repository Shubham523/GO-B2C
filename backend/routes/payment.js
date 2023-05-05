const express = require("express");
const { isUserSignedIn, isAuthenticated } = require("../controllers/authentication");
const {  makePayment } = require("../controllers/payment");
const router = express.Router();

router.post("/payment/processPayment",  makePayment);

module.exports = router;