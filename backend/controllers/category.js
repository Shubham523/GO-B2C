const Category = require("../models/category");

exports.getCategoryById = ( req, res, next, id ) => {
   Category.findById(id).exec( ( err, category ) => {
    
    if( err )
     {
         res.status(400).json({
             err : "no category found"
         })
     }
     
    req.category = category; 
    next();

   } );
};

exports.createCategory = ( req, res ) => {
    const category = new Category(req.body);
    
    category.save( (err, cateGory) => {
        if( err ) {
            res.status(400).json({
                err: err
            })
        }

        req.category = cateGory;
        res.json(req.category);
    })
};

exports.getCategory = ( req, res ) => {
    res.json(req.category);
}

exports.getAllCategories = ( req, res) => {
    Category.find().exec( ( err, categories ) => {
        if( err ) {
            res.status(400).json({
                err: "No Category found in the database"
            });
        }

        res.json(categories);
 
    });
};

exports.updateCategory = ( req, res ) => {
    const category = req.category;
    category.name = req.body.name;


    category.save( (err, updatedCategory ) => {
        if( err ) {
            res.status(400).json({
                err : "No category found in the database "
            });
        }

        res.json(updatedCategory);
    });
}

exports.removeCategory = ( req, res ) => {
    const category = req.category;

    Category.remove( ( err, deletedCategory ) => {
        if( err ) {
            res.status(400).json( {
                err : "failed to delete the category in the database "
            });
        }

        res.json( {
            message : "Category Succesfully Deleted "
        });
    });
};
