const { recipeSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const cloudinary = require('cloudinary').v2;

module.exports.validateRecipe = async (req, res, next) => {
    const { error } = recipeSchema.validate(req.body, { abortEarly: false });
    if (error) {
        if (req.file) {
            await cloudinary.uploader.destroy(req.file.filename);
        }
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
};
