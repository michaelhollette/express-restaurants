const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
const {router} = require("../routes/restaurants")

//TODO: Create your GET Request Route Below: 
app.use(express.json())
app.use(express.urlencoded());
app.use('/routes', router);

app.get("/restaurants", async (request, response) =>{
    const restaurants = await Restaurant.findAll();
    response.json(restaurants)
});
app.get("/restaurants/:id", async (request, response) =>{
    let id = request.params.id;
    let restaurant = await Restaurant.findByPk(id);
    response.json(restaurant);
    
})



app.post("/restaurants", async (req,res) =>{
    await Restaurant.create(req.body)
    const restaurants = await Restaurant.findAll();
    res.json(restaurants)
});

app.put("/restaurants/:id", async (req,res) => {
    await Restaurant.update(req.body, {where: {id: req.params.id}});
    let restaurants = await Restaurant.findAll();
    res.json(restaurants);
})

app.delete("/restaurants/:id", async (req,res) =>{
    await Restaurant.destroy({where: {id: req.params.id}});
    let restaurants = await Restaurant.findAll();
    res.json(restaurants);
})
module.exports = app;