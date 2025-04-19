const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productName: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    rating: {type: Number, required: true, default: 0},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]  
});


module.exports = mongoose.model("Product", productSchema, "Products");