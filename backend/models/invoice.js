const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductInCartSchema1 = new mongoose.Schema({

    product : { type : ObjectId, ref : "Products"},
    name : String ,
    count : Number,
    price : Number,
    

});

const ProductInCart1 = mongoose.model("ProductInCart1", ProductInCartSchema1);

const invoiceSchema  =  new mongoose.Schema({
    
    products:[ProductInCartSchema1],
    sellerName : {type : String,},
    sellerId:  {type : ObjectId, ref : "Sellers", required : true},
    userName : {type : String, required : true},
    userId:  {type : ObjectId, ref : "Users", required : true},
    amount : { type : Number },

    
    
},{ timestamps :  true});

module.exports = mongoose.model("Invoices", invoiceSchema, "Invoices");

/*user : {type : ObjectId,ref : "Users",required : true,},
    seller : { type : ObjectId, ref : "Sellers", required : true }*/