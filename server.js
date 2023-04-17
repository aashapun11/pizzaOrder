const express = require("express");
const app = express();
const path = require('path')
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");


// set Template engine
const template_path = path.join(__dirname,"/resources/views")

app.use(expressLayout)
app.set("view engine","ejs");
app.set("views",template_path);

const port = 3000 || process.env.PORT;
app.get('/',(req,res)=>{
    res.render("home")
})

app.listen(port,()=>{
    console.log(`Listening to the port ${port}`)
})