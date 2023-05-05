const Seller = require("../models/seller");
const nodemailer = require("nodemailer");
var dotenv = require("dotenv")
dotenv.config();


exports.getSellerById = ( req, res, next, id)=> {
    
    Seller.findById( id ).exec( ( err, seller ) => {
        
        if( err ) {
            res.status(400).json({
                err : "no seller found"
            });
        }

        req.profile = seller;
        next();
    }) ;
}

exports.getSeller = ( req, res ) => {
   
    req.profile.salt =  undefined;
    req.profile.encry_password  = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
};


exports.sendEmailToCustomers = (req,res)=>{
  
var transporter = nodemailer.createTransport({
  
  
 service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASS,

  }
});

var mailOptions = {
  from: process.env.EMAIL_ID,
  to: req.body.email,
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}


