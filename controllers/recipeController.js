const Category = require("../models/Category");
const Recipe = require("../models/Recipe");
const Contact = require("../models/Contact");

// Home Page
exports.homepage = async (req, res) => {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latestRecipes = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        const thai = await Recipe.find({ "category": "Thai" }).limit(limitNumber);
        const american = await Recipe.find({ category: "American" }).limit(limitNumber);
        const chinese = await Recipe.find({ category: "Chinese" }).limit(limitNumber);
        const foods = { latestRecipes, thai, american, chinese };
        res.render("layouts/index", { title: "Cooking Blog - Home", categories, foods });
}

//recipe Categories
module.exports.exploreCategories = async (req, res) => {
        const limitNumber = 20;
        const categories = await Category.find({});
        res.render("layouts/categories", { title: "Cooking Blog - Home", categories });
}

//recipe Details
module.exports.recipeDetails = async (req, res) => {
    let id = req.params.id;
        const recipe = await Recipe.findById(id);
        res.render("layouts/recipeDetails", { title: `Cooking Blog - ${recipe.name}`, recipe });
}

//Find Recipe By Category
module.exports.exploreCategoriesById = async (req, res) => {
        let id = req.params.id;
        const recipes = await Recipe.find({ "category": id });
        res.render("layouts/categories", { title: "Cooking Blog - Recipes", recipes  });
}

//Search Recipe
module.exports.searchRecipe = async (req, res) => {
    let search = req.body.search;
    const recipes = await Recipe.find({ $text: { $search: search, $diacriticSensitive: true } });
    res.render("layouts/search", { title: "Cooking Blog - Search", recipes });
}

//Explore Latest
module.exports.exploreLatest = async (req, res) => {
    try {
        const limitNumber = 20;
        const recipes = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        res.render("layouts/exploreLatest", { title: "Cooking Blog - Latest", recipes });
    } catch (err) {
        res.status(500).send({ message: err.message || "Error Occured" });
    }
}

//Explore Random

module.exports.exploreRandom = async (req, res) => {
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();
        res.render("layouts/exploreRandom", { title: "Cooking Blog - Random", recipe  });
}

//Submit Recipe
module.exports.submitRecipe = (req, res) => {
    const infoErrorObj = req.flash("error")[0];
    const infoSuccessObj = req.flash("success")[0];
    res.render("layouts/submitRecipe", { title: "Cooking Blog - Submit Recipe", infoErrorObj, infoSuccessObj });
};

module.exports.submitRecipePost = async (req, res, next) => {
    try {
        if (!req.file) {
            req.flash('error', 'Image is required.');
            return res.redirect('/submit-recipe');
        }

        const { path: url, filename } = req.file;
        const newRecipe = new Recipe(req.body);
        newRecipe.image = { url, filename };

        await newRecipe.save();

        req.flash('success', 'Recipe submitted successfully!');
        res.redirect("/submit-recipe");
    } catch (err) {
        req.flash('error', 'An error occurred while submitting the recipe.');
        return next(err);
    }
};

module.exports.about = (req, res) => {
    res.render("layouts/about", { title: "Cooking Blog - About" });
}

module.exports.contact = (req, res) => {
    const infoSuccessObj = req.flash('success')[0];
    const infoErrorObj = req.flash('error')[0];
    res.render("layouts/contact", { title: "Cooking Blog - Contact", infoSuccessObj, infoErrorObj });
}

module.exports.contactPost = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        req.flash('success', 'Thanks For Contacting Us!');
    } catch (err) {
        req.flash('error', 'An error occurred while submitting the form.');
    }
    res.redirect('/contact');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////