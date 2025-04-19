const express = require('express');
const router = express.Router();
const { getAllProducts, getProduct } = require('../controllers/products');


// /products routes
router.get('/', getAllProducts);
router.get('/:productId', getProduct);



module.exports = router;