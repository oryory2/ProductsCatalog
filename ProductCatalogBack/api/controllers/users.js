const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { throwNewError, handleError } = require('../helpers/helpers');


const signup = async (req, res) => {
    try
    {
        // get request fields
        const { username, password } = req.body;

        // validate the username/password
        if(!username || !password || username.trim() === "" || password.trim() === "")
        {
            throwNewError("Invalid username/password :(", 400);
        }

        // check if the username is already exist
        const user = await User.findOne({username});
        
        if(user)
        {
            throwNewError("username already exists :(", 400);
        }

        // create a new user with hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hashedPassword
        });

        await newUser.save();

        // generate token for the user (auto login after register)
        const token = jwt.sign({
            id: newUser._id,
            username: newUser.username
        },
        process.env.JWT_KEY, 
        {expiresIn: "1H"});

        res.status(200).json({
            message: "You have been registered successfully :)",
            token
        });
    }
    catch(error)
    {
        handleError(res, error);
    }
}

const login = async (req, res) => {
    try
    {
        // get request fields
        const { username, password } = req.body;

        // validate the username/password
        if(!username || !password || username.trim() === "" || password.trim() === "")
        {
            throwNewError("Invalid username/password :(", 400);
        }

        // authenticate the user
        const user = await User.findOne({username});
        const isValidPassword = user ? await bcrypt.compare(password, user.password) : false;

        if(!user || !isValidPassword)
        {
            throwNewError("Invalid username/password :(", 400);
        }

        // generate token for the user
        const token = jwt.sign({
            id: user._id,
            username: user.username
        },
        process.env.JWT_KEY, 
        {expiresIn: "1H"});

        res.status(200).json({
            message: "You have been logged in successfully :)",
            token
        })
    }
    catch(error)
    {
        handleError(res, error);
    }
}

module.exports = {signup, login};