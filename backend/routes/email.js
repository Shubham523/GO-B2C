const express = require('express');
const { sendEmailToUser } = require('../controllers/email');
const router = express.Router();

router.post("/email", sendEmailToUser)
module.exports = router;