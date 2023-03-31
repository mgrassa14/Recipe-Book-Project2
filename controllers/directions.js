const RecipeModel = require('../models/recipe');

module.exports = {
    create,
    delete: deleteDirection,
}

function deleteDirection(req, res) {
    RecipeModel.findOne({
        "directions._id": req.params.id,
    }).then(function (recipeDoc) {
        // if we don't find a match, movieDoc would be undefined
        if(!recipeDoc) return res.redirect('/recipes');
    
        // remove is method on mongoose subdocuments
        // review is a subdocument
        // its embedded in the movies, One movie has many rev iews
        recipeDoc.directions.remove(req.params.id);  // <- mutated a document!
        // mongodb doesn't know we removed the review, 
        // so we have to call save on the movieDoc to tell mongodb
        recipeDoc.save().then(function(){
            res.redirect(`/recipes/${recipeDoc._id}`); // go back to the movie change where the delete review form was!
        })
    
    
      }).catch(err => {
        res.send(err)
      })
}

function create(req, res){
    console.log(req.body, " <- req.body in create direction");
    RecipeModel.findById(req.params.id)
        .then(function(recipeDocument){
            console.log(recipeDocument);
            recipeDocument.directions.push(req.body);
            // res.send('create ingredient is hitting')

            recipeDocument.save().then(function () {
                res.redirect(`/recipes/${req.params.id}`);
            });
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
}