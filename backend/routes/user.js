const express = require("express");
const router = express.Router();

const { getUserbyId, getUser, updateUser, userPurchaseList } = require("../controllers/user"); // user controllers
const { isUserSignedIn, isAuthenticated  } = require("../controllers/authentication"); //authentication controllers

router.param( "userId", getUserbyId );

//Routes to Update the User
router.get( "/user/:userId" , isUserSignedIn, isAuthenticated, getUser);
router.put( "/user/:userId" , isUserSignedIn, isAuthenticated, updateUser);
router.put( "/user/orders/:userId" , isUserSignedIn, isAuthenticated, userPurchaseList);



module.exports = router;