const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const morgan = require('morgan'); 
const mongoose = require('mongoose');
const OrderRoutes = require('./api/routes/order');
const UserRoutes = require('./api/routes/user');

mongoose.connect("mongodb://localhost:27017/coffeeManager", { useNewUrlParser: true });



app.use(bodyParser.json());
app.use(morgan("dev"));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
     	'Access-Control-Allow-Headers', 
     	'Origin, X-Requested-With, Content-Type, Authorization'
     );
     if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
     	return res.status(200).json({});
     }
     next();
});

app.use('/order', OrderRoutes);
app.use('/user', UserRoutes);

app.use((req, res, next) => {
    const error = new Error("API wurde nicht gefunden.");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message
    })
});




module.exports = app;