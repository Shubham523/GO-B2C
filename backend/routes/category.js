const express = require('express');
const router = express.Router();

const { createCategory, getCategoryById, getCategory,
        getAllCategories, updateCategory, removeCategory } 
        = require("../controllers/category");

const { isAuthenticated, isSeller, isSellerSignedIn } = require("../controllers/authentication");
const { getSellerById } = require("../controllers/seller");


//Parameter extractor
router.param("sellerId", getSellerById); 
router.param("categoryId", getCategoryById);


//Routes

//read
router.get("/category/:catergoryId", isSellerSignedIn, isSeller, isAuthenticated);

//create
router.post("/category/create/:sellerId", isSellerSignedIn, isSeller,  isAuthenticated, createCategory  );

//read
router.get("/getCategory/:categoryId", getCategory);
router.get("/categories", getAllCategories);

//update
router.put("/category/:categoryId/:sellerId", isSellerSignedIn, isSeller,  isAuthenticated, updateCategory);

//delete
router.delete("/category/:categoryId/:sellerId", isSellerSignedIn, isSeller, isAuthenticated, removeCategory );

module.exports = router;