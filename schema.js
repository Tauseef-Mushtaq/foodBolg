const Joi = require('joi');
const Recipe = require("./models/Recipe");


module.exports.recipeSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    ingredients: Joi.alternatives().try(
        Joi.array().items(Joi.string()),
        Joi.string()
    ),
    category: Joi.string().valid(
        "Thai",
        "American",
        "Chinese",
        "Mexican",
        "Indian",
        "Spanish"
    ).required(),
    image: Joi.string().uri().allow("", null),
});

module.exports.recipeUpdateSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    email: Joi.string().email(),
    category: Joi.string().valid(
        "Thai",
        "American",
        "Chinese",
        "Mexican",
        "Indian",
        "Spanish"
    ),
    image: Joi.string().uri().allow("", null),
}).min(1);
