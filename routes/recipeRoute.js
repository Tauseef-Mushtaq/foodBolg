const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const { validateRecipe } = require("../middleware");
const multer = require('multer');
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
const wrapAsync = require("../utils/wrapAsync");

// App Router
router.get("/", wrapAsync(recipeController.homepage));
router.get("/recipe/:id", wrapAsync(recipeController.recipeDetails));
router.get("/categories", wrapAsync(recipeController.exploreCategories));
router.get("/categories/:id", wrapAsync(recipeController.exploreCategoriesById));
router.post("/search", wrapAsync(recipeController.searchRecipe));
router.get("/explore-latest", wrapAsync(recipeController.exploreLatest));
router.get("/explore-random", wrapAsync(recipeController.exploreRandom));
router.get("/submit-recipe", wrapAsync(recipeController.submitRecipe));
router.post("/submit-recipe", upload.single('image'), validateRecipe, wrapAsync(recipeController.submitRecipePost));
router.get("/about", wrapAsync(recipeController.about));
router.get("/contact", wrapAsync(recipeController.contact));
router.post("/contact", wrapAsync(recipeController.contactPost));

module.exports = router;
