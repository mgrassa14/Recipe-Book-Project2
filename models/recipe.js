const mongoose = require('mongoose');

// directions model (embedded)
const directionsSchema = new mongoose.Schema(
    {
        direction:{type: String, required: true}
    },
    {
        timestamps: true,
    }
);
// ingredients model (embedded)
const ingredientsSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        quantity: {type: Number, required: true},
        measurement: {type: String, required: true}
    },
    {
        timestamps: true,
    }
);

// recipe model
const recipeSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        style: String,
        // ONE recipe has MANY ingredients
        ingredients: [ingredientsSchema],
        // ONE recipe has MANY directions
        directions: [directionsSchema],
        // ONE user has MANY recipes
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //required: true
        userName: String,
        userAvatar: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Recipe", recipeSchema);