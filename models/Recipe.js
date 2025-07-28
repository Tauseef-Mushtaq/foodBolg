const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },

    category: {
        type: String,
        enum: ["Thai", "American", "Chinese", "Mexican", "Indian", "Spanish"],
        required: true
    },
    image: {
        url: String,
        filename: String,
    },
});

recipeSchema.index({ name: "text", description: "text" });

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;