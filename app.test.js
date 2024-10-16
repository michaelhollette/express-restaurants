const request = require('supertest');
const app = require('./src/app');
const Restaurant = require('./models/Restaurant');

let restaurants = []

describe("GET / route", () =>{
    beforeAll( async ()=>{
        let sequelizeRestaurants = await Restaurant.findAll();
        for (let i = 0; i < sequelizeRestaurants.length; i++) {
            sequelizeRestaurants[i].dataValues.updatedAt = sequelizeRestaurants[i].dataValues.updatedAt.toISOString();
            sequelizeRestaurants[i].dataValues.createdAt = sequelizeRestaurants[i].dataValues.createdAt.toISOString();
            restaurants.push(sequelizeRestaurants[i].dataValues)
          }
    })
    test("returns a status code of 200", async ()=>{
        const response = await request(app).get("/routes")
        expect(response.statusCode).toBe(200);
    });
    test("returns an array of restaurants", async ()=>{
        const response = await request(app).get("/routes")        
        expect(response.body).toBeInstanceOf(Array);
    });
    test("returns the correct number of restaurants", async () => {
        const response = await request(app).get("/routes");
        expect(response.body.length).toBe(restaurants.length);
        
    });
    test("returns the correct data", async ()=>{
        const response = await request(app).get("/routes")
        
  

        expect(response.body).toEqual(restaurants);
    });
    
    test("returns the correct updated data", async () =>{
        await request(app).put("/routes/6").send({name: "Luigi's", cuisine: "Italian"});
        let sequelizeRestaurants = await Restaurant.findAll();
        restaurants = []
        for (let i = 0; i < sequelizeRestaurants.length; i++) {
            sequelizeRestaurants[i].dataValues.updatedAt = sequelizeRestaurants[i].dataValues.updatedAt.toISOString();
            sequelizeRestaurants[i].dataValues.createdAt = sequelizeRestaurants[i].dataValues.createdAt.toISOString();
            restaurants.push(sequelizeRestaurants[i].dataValues)
        }
        const response = await request(app).get("/routes");
        expect(response.body).toEqual(restaurants);
    });
    test("returns the correct deleted data", async () =>{
        await request(app).delete("/routes/7");
        let sequelizeRestaurants = await Restaurant.findAll();
        restaurants = []
        for (let i = 0; i < sequelizeRestaurants.length; i++) {
            sequelizeRestaurants[i].dataValues.updatedAt = sequelizeRestaurants[i].dataValues.updatedAt.toISOString();
            sequelizeRestaurants[i].dataValues.createdAt = sequelizeRestaurants[i].dataValues.createdAt.toISOString();
            restaurants.push(sequelizeRestaurants[i].dataValues)
        }
        const response = await request(app).get("/routes");
        expect(response.body).toEqual(restaurants);
    });
})