const Product = require('../models/product');
const { throwNewError, handleError } = require('../helpers/helpers');

const getAllProducts = async (req, res) => {
    try
    {
        // get all products and populate them with their relevant reviews
        // convert each userId of review with the relevant username
        let products = await Product.find()
        ?.populate({
          path: "reviews",
          populate: {
            path: "userId",
            select: "username"
          }
        })
        ?.lean();

        // check if there are no products
        if(products.length === 0)
        {
            return res.status(204).json({
                message: "There are no existing products.."
            });
        }

        // manipulate review objects
        products = products.map((product) => ({
            ...product,
            reviews: product.reviews.map((review) => ({
                _id: review._id,
                rating: review.rating,
                description: review.description,
                createdAt: review.createdAt,
                username: review.userId?.username
            }))
        }));

        res.status(200).json(
            products
        );
    }
    catch(error)
    {
        handleError(res, error);
    }
}


const getProduct = async (req, res) => {
    try
    {
        // get query params
        const productId = req.params.productId;

        // validate the request
        if(!productId)
        {
            throwNewError("invalid request", 400);
        }
        
        // get the relevant product
        const product = await Product.findOne({_id: productId}).populate({
            path: "reviews",
            populate: {
              path: "userId",
              select: "username"
            }
          })
          .lean();

        // validate the product
        if(!product)
        {
            throwNewError("product not exist", 400);
        }

        // manipulate review objects
        product.reviews = product.reviews.map((review) => ({
            _id: review._id,
            rating: review.rating,
            description: review.description,
            createdAt: review.createdAt,
            username: review.userId?.username
        }));

        res.status(200).json({
            product
        });
    }
    catch(error)
    {
        handleError(res, error);
    }
}


module.exports = {getAllProducts, getProduct};