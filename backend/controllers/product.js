const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");


exports.getProductById = ( req, res, next, id) => {

    Product.findById( id ).populate("category")
    .exec( ( err, product )=> {
        if( err ) {
            res.status(400).json({
                err : "No product found in the database"
            })
        }

        req.product = product;

        next();
    } );
};

exports.createProduct = ( req, res) => {
    let form = formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse( req, ( err, fields, file) => {

        if( err ){
             return res.status(400).json({
                error : "error while uploading the image"
            });
        }

        const {name, description, price, category,quantity, seller } = fields;
       
        if(!name || !description || !price || !category || !quantity) {
            return res.status(400).json({error : "all fields are mandatory"});
        }

        let product = new Product(fields);

        if(file.image){
            if(file.image.size > 3000000){
                 return res.status(400).json({
                    error : "Image size is too large"
                });
            }
        }

        product.image.data = fs.readFileSync(file.image.path);
        product.image.contentType = file.image.type;
        
        product.save( ( err, newProduct ) => {
            if( err ) {
                console.log(err)
                return res.status(400).json({
                    error : err
                });
            
            }

            res.json({message : "Product successfully created"});
            res.json(newProduct);
        } );
    });
}


exports.getProduct = ( req, res ) => {
    // this done is in order to reduce the loading time while fteching the data dynamically as photo will be loaded in background
    req.product.image = undefined ;
    return res.json(req.product);
}

exports.getProductImage = ( req, res, next) => {
  
    if( req.product.image.data ){     
       res.set("Content-Type", req.product.image.contentType);
       return res.send(req.product.image.data);
    }
    
    next();
};

exports.deleteProduct = ( req, res ) => {
    let product = req.product;

    product.remove( ( err, deletedProduct ) => {
        if( err ) {
            return res.status(400).json({
                err : "Failed to remove the Product"
            });
        }

        res.json({
            message : "Product Deleted Successfully",
            deletedProduct : deletedProduct
        });
    } );
};


exports.updateProduct = ( req, res ) => {
    let form = formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse( req, ( err, fields, file) => {

        if( err ){
             return res.status(400).json({
                err : "error while uploading the image"
            });
        }

       

        let product = req.product;
        product = _.extend( product, fields);

        if(file.image){
            if(file.image.size > 3000000){
                 return res.status(400).json({
                    err : "Image size is too large"
                });
            }
        }

        product.image.data = fs.readFileSync(file.image.path);
        product.image.contentType = file.image.type;

        product.save( ( err, newProduct ) => {
            if( err ) {
                console.log(err)
                return res.status(400).json({
                    err : "Error while updating product in the database"
                });
            
            }

            res.json({message : "Product successfully updated"});
            res.json(newProduct);
        } );
    });
};

exports.getAllProducts = ( req, res ) => {
   
    let limit = req.query.limit ? parseInt(req.query.limit) : 10; // here parseInt() is used cz it will be string by default and we need number
    let sortBy = req.query.sortBy ?  req.query.sortBy : "_id" ;
    
    Product.find()
    .select("-image")            //the " - " minus sign means not to select this particular field while fetching from the database
    .limit(limit)               //limits the total number of products fetched
    .sort([[sortBy,"asc"]])     // sorts the product based on sortBy Parameter
    .populate("category") 
    .exec( (err, products ) => {
        if( err ) {
            return res.status(400).json({
            message : "No Products found"
            });
        }

        res.json(products);
    }) ;
};


exports.getAllSellersProducts = (req, res ) => {


    Product.find({seller : req.profile._id} ).select("-image").exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error : err
            })
        }
        else {
            return res.json(products);
        }
    })
}

exports.updateQuantitySold = ( req, res, next ) => {

    let operations = req.body.order.products.map( prod => {
        return {
            updateOne : {
                filter : prod._id,
                update : { $inc : { quantity : - prod.count, quantitySold : + prod.count } }
            }
        };
    });

    Product.bulkWrite(operations, {}, (err, updatedProduct ) => {

        if( err ) {
            res.status(400).json({
                err : err
            });
        }
    });
    
    next();
};

exports.getAllUniqueCategories = ( req, res ) => {

    Product.distinct("category", {}, ( err, category) => {
        
        if( err ) {
            res.status(400).json({
                err : "No Unique Category Found"
            });
        }

        res.json(category);
    });
};