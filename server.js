const express = require("express");
const app = express();
const path = require('path')
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");

// to use the static path
const static_path = path.join(__dirname,"/public");
app.use(express.static(static_path))

// set Template engine
const template_path = path.join(__dirname,"/resources/views")

app.use(expressLayout)
app.set("view engine","ejs");
app.set("views",template_path);

const port = 3000 || process.env.PORT;
app.get('/',(req,res)=>{
    res.render("home");
})

app.get('/cart',(req,res)=>{
    res.render("customers/cart")
})

app.get('/login',(req,res)=>{
    res.render("auth/login")
})

app.get('/register',(req,res)=>{
    res.render("auth/register")
})

app.listen(port,()=>{
    console.log(`Listening to the port ${port}`)
})