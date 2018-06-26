const express = require('express');
const app = express();
const carsRoutes = require('./routes/carsRoutes');

// connect DB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Adminas:Bandom3@ds241869.mlab.com:41869/cars-server');
mongoose.connection
        .once('open', ()=>{console.log('connected to DB')})
        .on('error', (err)=>{console.log(err)})

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',carsRoutes);

app.listen(9000, ()=>{
    console.log('server is running on port 9000');    
});
        