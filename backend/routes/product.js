const express = require("express");
const router  = express.Router();

const { isAuthenticated, isSeller, isSellerSignedIn } = require("../controllers/authentication");
const  { getSellerById } = require("../controllers/seller");
const { getProductById, createProduct, getProduct, getProductImage,
        updateProduct, deleteProduct, getAllProducts, getAllSellersProducts } = require("../controllers/product");

// parameter extractor
router.param("productId", getProductById);
router.param("sellerId", getSellerById);

//routes

//create route
router.post("/product/create/:sellerId", isSellerSignedIn, isSeller, isAuthenticated, createProduct)

//read routes
router.get("/product/:productId", getProduct);
router.get("/product/image/:productId", getProductImage);
router.get("/products", getAllProducts);
router.get("/products/:sellerId", isSellerSignedIn, isSeller, isAuthenticated, getAllSellersProducts);
//delete route
router.delete("/product/:productId/:sellerId", isSellerSignedIn, isSeller, isAuthenticated, deleteProduct);

//update route
router.put("/product/:productId/:sellerId", isSellerSignedIn, isSeller, isAuthenticated, updateProduct)
module.exports = router;