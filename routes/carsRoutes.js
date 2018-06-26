const express = require('express');
const router = express.Router();
const Car = require ('../models/Car.js');
const fs = require ('fs');

router.get('/cars', async (req,res)=>{
    try{
        const cars = await Car.find();
        res.json(cars)
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/car/create', async (req,res) =>{
    try{
        console.log(req.body);
        const car = new Car({
            id: req.body.id,
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            rideDistance: req.body.rideDistance,
            fuelType: req.body.fuelType,
            price: req.body.price,
        });
        await car.save();
        res.send('car saved');
    } catch(err){
        res.status(400).json(err)
    }
});

router.get('/cars/:id', async (req,res)=>{
    console.log(req.params.id);
    console.log(typeof req.params.id);
    try {
        const car = await Car.findOne({ id: req.params.id });
        console.log(car);
        res.json(car)
    } catch(err){
        res.json(err)
    }
});

router.delete('/cars/:id', async(req,res)=>{
    try {
        const car = await Car.findOne({ id: req.params.id });
        if(!car) return res.status(404).send('car not found!');
        await car.remove();
        res.send('removed');
    } catch(err){
        res.json(err)
    }
});

router.get('/cars/filter/:property', async(req,res)=>{
    console.log(req.params.property);
    
    
    try {
        const cars = await Car.find();
        const filtered = [];
       cars.forEach((car)=>{
           if (req.params.property in car){
               filtered.push(car);
           } else {
               return null
           }
       })
        fs.writeFile('./filtered.json', filtered, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        res.json(filtered)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;