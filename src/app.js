const express = require("express");
const app = express();
const {Restuarant} = require("../models/index");

const {Menu} = require("../models/index");
const {Item} = require("../models/index");
const {router} = require("../routes/restaurants")

//TODO: Create your GET Request Route Below: 
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/routes', router);


module.exports = app;