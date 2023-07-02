const express = require("express");
const app = express();
const path = require('path')
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');
const cookieParser = require("cookie-parser");
const passport = require("passport");

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended : false}));

require('dotenv').config();



// Database connection
require("./databse/connection")


// to use the static path
const static_path = path.join(__dirname,"/public");
app.use(express.static(static_path))

app.use(flash());


//session config
// session works as middleware 
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    store : MongoDbStore.create({ mongoUrl: 'mongodb://0.0.0.0:27017/pizza' }),
    saveUninitialized : false,  
    cookie: {maxAge : 1000 * 60 * 60 *24} //24 hours

}))
// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


// To make available to session in each request
app.use(function(req,res,next) {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})

// set Template engine
const template_path = path.join(__dirname,"/resources/views")

app.use(expressLayout)
app.set("view engine","ejs");
app.set("views",template_path);

const port = 3000 || process.env.PORT;

//importing the router of the routes/web.js

app.use('/', require("./routes/web"))
// 


app.listen(port,()=>{
    console.log(`Listening to the port ${port}`)
})