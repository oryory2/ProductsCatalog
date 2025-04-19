const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const usersRoutes = require('./api/routes/users');
const productsRoutes = require('./api/routes/products');
const reviewsRoutes = require('./api/routes/reviews');
const checkAuth = require('./api/middlewares/checkAuth')


// connect to db
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


// enable http logs with morgan
app.use(morgan("dev"));


// add cors configuration
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


// enable extraction of data from body
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));


// configure the routes of the application
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/reviews', checkAuth, reviewsRoutes);


// handle "page not found" http request
app.use((req, res, next) => {
    const error = new Error("Page Not Found");
    error.status = 404;
    next(error);
});


// error middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error.toString(),
    });
});
    

module.exports = app;