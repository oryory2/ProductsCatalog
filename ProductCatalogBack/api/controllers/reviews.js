const mongoose = require('mongoose');
const Review = require('../models/review');
const Product = require('../models/product');
const User = require('../models/user');
const { throwNewError, handleError } = require('../helpers/helpers');


const addReview = async (req, res) => {
    try
    {
        // get request fields
        const { productName, username, rating, description } = req.body;

        // validate the request
        if(!productName || !username || !rating || !description)
        {
            throwNewError("invalid request", 400);
        }

        // validate user and product
        const product = await Product.findOne({productName});
        const user = await User.findOne({username});        

        if(!product || !user)
        {
            throwNewError("invalid product/user", 400);
        }

        // create new review
        const newReview = new Review({
            _id: new mongoose.Types.ObjectId(),
            productId: product._id,
            userId: user._id,
            rating: Number(rating),
            description,
            createdAt: new Date()
        });

        await newReview.save();

        // add the new review to the relevant product, and update the product rating
        try
        {
            product.reviews.push(newReview._id);       
            product.rating = (product.rating * (product.reviews.length - 1) + Number(rating)) / product.reviews.length
            await product.save();
        }
        catch
        {
            // in case of error in the product update proccess, rollback the review creation
            await Review.deleteOne({_id: newReview._id});
            throwNewError("unable to add the review", 500);
        }

        res.status(200).json({
            message: "review created successfully :)"
        });
    }
    catch(error)
    {
        handleError(res, error);
    }
}


const updateReview = async (req, res) => {
    try
    {
        // get query params
        const reviewId = req.params.reviewId;

        // get request fields
        const { productName, username, rating, description } = req.body;

        // validate the request
        if(!reviewId || !productName || !username || !rating || !description)
        {
            throwNewError("invalid request", 400);
        }

        // validate the review/user/product
        let review = await Review.findOne({_id: reviewId});
        const user = await User.findOne({username: username});
        const product = await Product.findOne({productName: productName});

        if(!review || !user || !product)
        {
            throwNewError("invalid review/user/product", 500);
        }

        // validate the user/product connected to the review
        if(!review.userId.equals(user._id) || !review.productId.equals(product._id))
        {
            throwNewError("user/product are not matching for the existing review", 500);
        }

        // update the rating of the product connected to the review
        product.rating += (rating - review.rating) / product.reviews.length;
        await product.save(); 

        // update the review
        await Review.updateOne({_id: reviewId}, {rating, description, createdAt: new Date()});

        res.status(200).json({
            message: "review updated successfully"
        });
    }
    catch(error)
    {
        handleError(res, error);
    }
}


const deleteReview = async (req, res) => {
    try
    {
        // get query params
        const reviewId = req.params.reviewId;

        // validate the request
        if(!reviewId)
        {
            throwNewError("invalid request", 400);
        }

        // validate the review
        const review = await Review.findOne({_id: reviewId});
        if(!review)
        {
            throwNewError("review not exist", 500);
        }

        // delete the review from the product and update the product rating
        const product = await Product.findOne({_id: review.productId});
        product.rating = product.reviews.length !== 1 
        ? (product.rating * product.reviews.length - review.rating) / (product.reviews.length - 1)
        : 0
        product.reviews = product.reviews.filter((review) => !(review._id).equals(reviewId));
        await product.save();

        // delete the review
        await Review.deleteOne({_id: reviewId});

        res.status(200).json({
            meesage: "review deleted successfully"
        });
    }
    catch(error)
    {
        handleError(res, error);
    }
}



module.exports = {addReview, updateReview, deleteReview};


