const mongoose = require ("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductInCartSchema = new mongoose.Schema({

    product : { type : ObjectId, ref : "Products"},
    name : String ,
    count : Number,
    price : Number,
    

});

const ProductInCart = mongoose.model("ProductInCart", ProductInCartSchema);

const orderSchema = new mongoose.Schema({

   products:[ProductInCartSchema],
   transactionId : {},
   amount : { type : Number },
   address : String,
   updated : Date,
   status : {
       type : String,
       default: "Processing",
       enum : ["Cancelled", "Delivered", "Processing","Out for Delivery"],
   },
   user : {
       type : ObjectId,
       ref : "Users",
       required : true,
      },
      seller : {
        type : ObjectId,
        ref : "Sellers",
        required : true
       }

},{ timestamps : true });

const Order = mongoose.model("Orders", orderSchema, "Orders");

module.exports = { Order, ProductInCart };