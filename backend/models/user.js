const mongoose = require("mongoose");
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

const userSchema = mongoose.Schema({
    
    firstName : { type: String, required : true},
    lastName : { type: String, required : true},
    email : { type : String, unique : true, required : true } ,
    mobileNumber : { type : String, unique : true, required : true } ,
    encry_password : { type : String, unique : true, required : true } ,
    role : { type : String, required : true } ,
    wishlist : { type : Array, default : [] } ,
    purchases : { type: Array, default : [] } ,
    likedProducts : { type  :Array, default : [] } ,
    salt : { type : String }
    
},{timestamps:true});

userSchema.virtual("password")
.set(function(password)
{
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function()
{
    return this._password;
});

userSchema.methods = {
    authenticate: function(plainPassword)
    {
        return this.securePassword(plainPassword) === this.encry_password;
    },

    /* securePasssword method converts plain password to sha256 password and 
    secures the new Password */

    securePassword: function(plainPassword) 
     {
        if(!plainPassword) return "";
        
        try {
            return crypto.
              createHmac('sha256', this.salt)
             .update(plainPassword)
             .digest('hex');
         }catch(error){
             return "";
         }
     }
};

module.exports = mongoose.model("Users",userSchema,"Users");
/* in the above line mongoose.model takes 3 parameters
1. "Users"- name of model
2. userSchema - name of schema
3. "Users" - name of the collection inside which the data of the model will be stored
*/