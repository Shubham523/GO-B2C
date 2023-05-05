const express = require('express');
const { generateInvoice } = require('../controllers/invoice');
const router = express.Router();

router.post("/invoice", generateInvoice)
module.exports = router;