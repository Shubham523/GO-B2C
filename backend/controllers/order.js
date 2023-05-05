const {Order, ProductInCart} = require("../models/order");

exports.getOrderById = ( req, res, next, id) => {

    Order.findById( id )
    .populate("products.product", "name price")
    .exec( ( err , order ) => {
        if( err ) {
            res.status(400).json({
                err : "No orders found in the database"
            });
        }

        req.order = order;
    });
    next();
};

exports.createOrder = ( req, res ) => {

    req.body.order.user = req.profile;
    const order = new Order( req.body.order );
    order.save( (err , savedOrder ) => {
    
     if( err ) {
         res.status(400).json({
             err : err
         });
     }
     
    return res.json(savedOrder);

    });
};

exports.getAllOrders = ( req, res ) => {
    Order.find().populate("users", "_id name").exec( ( err, orders ) => {
 
        if( err ) {
            res.status(400).json({
                err : "No orders found in the Database "
            });
        }

        res.json(orders);
    });
};

exports.getAllSellerOrders = ( req, res ) => {
    
    Order.find({seller : req.profile._id}).populate("sellers", "_id name").exec( ( err, orders ) => {
 
        if( err ) {
            res.status(400).json({
                err : "No orders found in the Database "
            });
        }

        res.json(orders);
    });
};




exports.getAllOrders = ( req, res ) => {
    Order.find().populate("users", "_id name").exec( ( err, orders ) => {
 
        if( err ) {
            res.status(400).json({
                err : "No orders found in the Database "
            });
        }

        res.json(orders);
    });
};

exports.getOrderStatus = ( req, res ) => {

    res.json(Order.schema.path("status"));
};

exports.updateOrderStatus = ( req, res ) => {
    Order.update(
        {_id : req.order.orderId},
        { $set : { status : req.order.status } } ,
        ( err, updatedOrder ) => {

            if( err ) {
                res.status(400).json({
                    err : "Failed to Update Order Status in the Database"
                });
            }

            res.json(updatedOrder);
        }
    );
};