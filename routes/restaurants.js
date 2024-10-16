const {Router} = require("express");
const Restaurant = require("../models/index")
const db = require("../db/connection");

const router = Router();

router.get("/", async (req,res) =>{
    const restaurants = await Restaurant.findAll();
    res.json(restaurants)
});
router.get("/:id", async (req,res) =>{
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant)
});

router.post("/", async (req,res) =>{
    await Restaurant.create(req.body);
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
});

router.put('/:id', async (req,res) =>{
    await Restaurant.update(req.body, {where: {id: req.params.id}});
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant);
});

router.delete('/:id', async (req,res) =>{
    await Restaurant.destroy({where: {id: req.params.id}});
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
});

module.exports = {router};