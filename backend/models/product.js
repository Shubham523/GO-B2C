const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

productSchema = mongoose.Schema({

    name : { type : String, minLength : 4, required : true },
    description : { type : String, minLength : 10, required : true },
    image : { data : Buffer, contentType : String },
    price : { type : Number, required : true, maxLength : 32 },
    quantity : { type: Number, required : true },
    quantitySold : { type :Number, default : 0 },
    category : { type : ObjectId, ref : "Category", required : true },
    seller : { type : ObjectId, ref: "Sellers", required: true}
},{timestamps:true});

module.exports = mongoose.model("Products", productSchema, "Products");
