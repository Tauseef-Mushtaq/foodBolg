if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");


let app = express();

const port = process.env.PORT || 3000;

const dbUrl = process.env.MONGO_URL;

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


async function main() {
    await mongoose.connect(dbUrl);
}

app.use(express.urlencoded( {extended : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(expressLayouts);

app.use(cookieParser("cookingBlogSecure"));
app.use(session({
    secret: "cookingBlogSecret",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.set("view engine", "ejs");
app.set("layout", "./layouts/main");

const routes = require("./routes/recipeRoute.js");
app.use("/", routes);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page not Found!"));
    
})

app.use((err, req, res, next)=>{
    let {statusCode=500, message="Something went wrong"} = err;
    res.status(statusCode).render("layouts/error.ejs", {message});
});


app.listen(port, () => {console.log(`listening to port ${port}`)});
