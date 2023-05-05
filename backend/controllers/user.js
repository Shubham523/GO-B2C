const User =  require("../models/user");
const Order = require("../models/order")

exports.getUserbyId = ( req, res, next, id ) => {

    User.findById( id ).exec( ( err, user ) => {
       
        if( err || !user )
       {
           res.status( 400 ).json({
             error : "no user was found in the database"
           });
       } 
       
       req.profile = user;
       next();
   
    });
};


exports.getUser = ( req, res ) => {
   
    // sensitive information is removed from user's browser using the following steps
    req.profile.salt =  undefined;
    req.profile.encry_password  = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
};


exports.updateUser = ( req, res) => {
    User.findByIdAndUpdate(
        { _id :  req.profile._id },
        { $set : req.body },
        { new : true, useFindAndModify : false },
        
        ( err , user ) => {
            if( err )
            { 
                return res.status(400).json({ 
                error : "you are not authorized to update this user"
                }) 
           }
           user.salt =  undefined;
           user.encry_password  = undefined;
           user.createdAt = undefined;
           user.updatedAt = undefined;
           res.json(user);
        }
    )
}

exports.userPurchaseList = ( req, res ) => {
  
    Order.find( { user : req.profile.user._id } )
    .populate("user","_id name")
    .exec(( err, order ) => {
        if(err)
        {
            return res.json("No order in this user's account")
        }

        return res.json(order);
    });
};


exports.pushOrderInPurchaseList = ( req, res, next ) => {
   
    let purchases = [];   
    req.body.order.products.forEach( product  => {
        purchases.push({
            _id : product._id,
            name : product.name,
            descrption : product.descrption,
            category : product.category,
            quantity : product.quantity,
            amount : req.body.order.amount,
            transactionId : req.body.order.transactionId
        });
    });
    // update in the database
    User.findOneAndUpdate(
        { _id : req.profile._id },
        { $push : { purchases : purchases } },
        { new : true},
        (err, pruchase ) => {
            if(err) {
                res.status(400).json({
                    err : "Unable to save purchase list"
                });
            }
            next();
        }
    );
    
};