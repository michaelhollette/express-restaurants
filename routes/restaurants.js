const {Router} = require("express");
const {Restaurant, Menu, Item} = require("../models/index")
const db = require("../db/connection");
const {check, validationResult} = require('express-validator');

const router = Router();

router.get("/", async (req,res) =>{
    const restaurants = await Restaurant.findAll();
    res.json(restaurants)
});
router.get("/:id", async (req,res) =>{
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant)
});

router.post("/", [check("name").not().isEmpty().trim(),check("location").not().isEmpty().trim(),check("cuisine").not().isEmpty().trim()], async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        await Restaurant.create(req.body);
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);

    }
    
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