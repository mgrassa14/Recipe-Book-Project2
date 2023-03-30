const RecipeModel = require('../models/recipe');

module.exports = {
    new: newRecipe,
    index,
    create,
    show
}

function show(req, res){
    RecipeModel.findById(req.params.id)
        .then(function(recipeDoc){
            console.log(recipeDoc.userId, '<<<<<>> userID')
            console.log(recipeDoc)
            res.render('recipes/show', {recipe: recipeDoc})
        }).catch((err) => {
			console.log(err);
			res.send(err)
		})
}

function create(req, res){
    console.log(req.body, '<--- contents of the form req.body')
    // res.send('hitting post route, check terminal for contents of form')
    req.body.userId = req.user._id
    req.body.userName = req.user.name
    RecipeModel.create(req.body)
    .then(function(recipeCreatedInTheDb){
        console.log(recipeCreatedInTheDb, " <- recipe document")
        res.redirect('/recipes')

    }).catch((err) => {
		console.log(err);
		res.send('There was an error check the terminal, or log the err object')
	})
}

function index(req, res){
    RecipeModel.find({})
        .then(function(allRecipes){
            console.log(allRecipes, '<<<<data from the db')
            res.render('recipes/index', {recipes: allRecipes})
        }).catch((err) => {
			console.log(err);
			res.send(err)
		})
    
}

function newRecipe(req, res){
    res.render('recipes/new')
}