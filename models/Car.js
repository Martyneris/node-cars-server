const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    id:{
        type:Number,
        required:true,
        minlength:2,
        unique:true
    },
    brand:{
        type:String,
        required:true,
        minlength:3,
    },
    model:{
        type:String,
        required:true,
        minlength:3
    },
    year:{
        type:Number,
        required:true,
        minlength:4
    },
    rideDistance:{
        type:Number,
        required:true,
        minlength:4
    },
    fuelType:{
        type:String,
        required:true,
        minlength:3
    },
    price:{
        type:Number,
        required:true,
        minlength:4
    }
})

module.exports = mongoose.model('cars',CarSchema);