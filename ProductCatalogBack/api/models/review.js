const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product"},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    rating: {type: Number, required: true},
    description: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Review", reviewSchema, "Reviews");