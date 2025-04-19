const express = require('express');
const router = express.Router();
const { addReview, updateReview, deleteReview } = require('../controllers/reviews');


// /reviews routes
router.post('/', addReview);
router.patch('/:reviewId', updateReview);
router.delete('/:reviewId', deleteReview);



module.exports = router;