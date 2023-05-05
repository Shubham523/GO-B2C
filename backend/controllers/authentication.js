require('dotenv').config();
const User = require("../models/user");
const Seller  = require("../models/seller");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { check, validationResult, body } = require("express-validator");

exports.userSignUp = (req,res) => {
   
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }

    User.findOne({email : req.body.email}, (err, newUser) => {
        if(newUser) {
           
            return res.status(422).json({
                error : "Email already exists"
            })
        }
    });

    const user = new User(req.body);
    user.save((err,user)=>{

        if(err) { 
            console.log(err)
            return res.status(400).json({
                err : "Failed to Add User in the Database"
            })
        }      
        else    { res.json({message: "User Added Successfully"}); }
        
    });

   return;
};

exports.sellerSignUp = (req,res) => {
    
    const errors = validationResult(req);
   
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }

    Seller.findOne({email : req.body.email}, (err, newSeller) => {
        if(newSeller) {
           
            return res.status(422).json({
                error : "Email already exists"
            })
        }
    });
   
    const seller = new Seller(req.body);
    seller.save((err,seller)=>{

        if(err) { console.log(err);}      
        else    { res.json({message: "Seller Added Successfully"}); }
        
    });

   return;
};

exports.userLogin = (req,res) => {
  const{ email , password } = req.body;

  User.findOne( { email : req.body.email }, ( err , user )=>{
      if(!user)  
      { return res.status(422).json({error : "Email does not exist in the database" });}
      if(!user.authenticate(password))
      {
          res.status(422).json({error : "Email and Password does not match"});
      }
      else 
      {
         
        const userToken = jwt.sign({_id:user._id}, process.env.USER_SECRET);
        res.cookie("userToken", userToken,{expire : new Date() + 9999});
         
         res.json({
             _id: user._id,
             firstName: user.firstName,
             lastName: user.lastName,
             email : user.email,
             mobileNumber: user.mobileNumber,
             token:userToken,
             role:user.role
         });

      }
  });
  return;
};

exports.sellerLogin = (req,res) => {
    const{ email , password } = req.body;

    Seller.findOne({email : req.body.email}, (err, seller) => {
        if(!seller) {
           
            return res.status(422).json({
                error : "Email does not exist in our Database"
            })
        }
        else{
            if(!seller.authenticate(password))
        {
             return res.status(422).json({ error : "Email and Password do not match"});
        }
        else 
        {
            const sellerToken = jwt.sign({_id:seller._id}, process.env.SELLER_SECRET);
            res.cookie("sellerToken",sellerToken,{expire : new Date() + 9999});
        
            res.json({
               _id: seller._id,
               firstName: seller.firstName,
               lastName: seller.lastName,
               email : seller.email,
               mobileNumber: seller.mobileNumber,
               token:sellerToken,
               role : seller.role
            });
          
        }
        }

    });
    
    return;
  };

exports.userSignOut = (req,res) => {
    res.clearCookie("userToken");
    res.json({message : "User Signed out succesfully"});
};

exports.sellerSignOut = (req,res) => {
    res.clearCookie("sellerToken");
    res.json({message : "Seller Signed out succesfully"});
};

  //middlewares for protected routes

exports.isUserSignedIn = expressJwt({
      secret : process.env.USER_SECRET,
      userProperty: "auth",
      algorithms: ['HS256']
});

exports.isSellerSignedIn = expressJwt({
    secret : process.env.SELLER_SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
});

exports.isAuthenticated = ( req, res, next ) => {
   let checker = req.profile && req.auth && req.profile._id == req.auth._id;

   if(!checker) // if checker returns a false result
   {
       res.status(403).json({
           message : "Access Denied"
       });
   }
   next();
};

exports.isSeller = ( req, res, next ) => {
    if(req.profile.role === "user")
    {
       return res.json({ error : "Access Denied " } );
    }
    next();
};

