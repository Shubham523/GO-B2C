const express = require("express");
const router = express.Router();

const {getSellerById,getSeller}  = require("../controllers/seller ");
const { isSeller, isSellerSignedIn, isAuthenticated} = require("../controllers/authentication");


router.param("sellerId",getSellerById);

router.get("/seller/:sellerId",isSellerSignedIn, isSeller, getSeller);


module.exports = router;