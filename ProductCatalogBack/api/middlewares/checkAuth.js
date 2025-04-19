const jwt = require('jsonwebtoken');


// middleware for authentication of the user
const checkAuth = async (req, res, next) => {
    try
    {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY);
        next();
    }
    catch(error)
    {
        res.status(401).json({
            error: error.toString()
        });
    }
}

module.exports = checkAuth;