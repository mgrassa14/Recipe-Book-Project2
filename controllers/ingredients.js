const RecipeModel = require('../models/recipe');

module.exports = {
    create
}

function create(req, res){
    console.log(req.body, " <- req.body in create ingredient");
    RecipeModel.findById(req.params.id)
        .then(function(recipeDocument){
            console.log(recipeDocument);
            recipeDocument.ingredients.push(req.body);
            // res.send('create ingredient is hitting')

            recipeDocument.save().then(function () {
                res.redirect(`/recipes/${req.params.id}`);
            });
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
}