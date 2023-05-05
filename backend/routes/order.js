
const express = require("express");
const router = express.Router();

const {isSeller, isSellerSignedIn, isAuthenticated, isUserSignedIn } = require("../controllers/authentication");
const { getUserbyId, pushOrderInPurchaseList } = require("../controllers/user");
const { updateQuantitySold } = require("../controllers/product");
const { createOrder, getAllOrders, getOrderStatus, updateOrderStatus, getOrderById, getAllSellerOrders } = require("../controllers/order");
const { getSellerById } = require("../controllers/seller")

//params
router.param("userId", getUserbyId);
router.param("orderId", getOrderById);
router.param("sellerId", getSellerById);

//CREATE
router.post("/order/create/:userId", isUserSignedIn, isAuthenticated, 
pushOrderInPurchaseList,  createOrder );

//READ
router.get("/orders/all/:sellerId", isSellerSignedIn, isSeller, isAuthenticated, getAllOrders);
router.get("/order/status/:sellerId",isSellerSignedIn, isSeller, isAuthenticated, getOrderStatus);
router.get("/orders/allSellerOrders/:sellerId", isSellerSignedIn, isSeller, isAuthenticated, getAllSellerOrders);

//UPDATE
router.put("/orders/:orderId/:sellerId",isSellerSignedIn,isSeller,isAuthenticated, updateOrderStatus)
module.exports = router;

