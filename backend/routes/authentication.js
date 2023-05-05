const express = require("express");
const router = express.Router();
const{ userSignUp, userLogin, userSignOut, isUserSignedIn,
       sellerSignUp, sellerLogin, sellerSignOut, isSellerSignedIn } = require("../controllers/authentication");
const { check, validationResult, body } = require("express-validator");
const User = require("../models/user")

//Routes for User
router.post("/UserSignUp",[
    
    check("email").isLength({ min : 4 }).withMessage("email should be of more than 4 characters"),
    check("email").isEmail().withMessage("invalid email"), 
    check("password").isLength({min: 7}).withMessage("password should be of minimum 7 characters long"),
     
],userSignUp);
router.post("/UserLogin", userLogin);
router.get("/UserSignOut", userSignOut);



//Routes for Seller
router.post("/SellerSignUp",[
    
        check("email").isLength({ min : 4 }).withMessage("email should be of more than 4 characters"),
        check("email").isEmail().withMessage("invalid email"), 
        check("password").isLength({min: 7}).withMessage("password should be of minimum 7 characters long"),

    ], sellerSignUp);
router.post("/SellerLogin", sellerLogin);
router.get("/SellerSignOut", sellerSignOut);

module.exports = router;