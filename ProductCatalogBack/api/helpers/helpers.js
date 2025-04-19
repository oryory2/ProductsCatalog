

// helper function to create and throw new Error
const throwNewError = (errorText, errorStatus) => {
    const error = new Error(errorText);
    error.status = errorStatus;
    throw error;
}

// helper function to handle throwed Error
const handleError = (res, error) => {
    res.status(error.status || 500).json({
        error: error.toString()
    });
}

module.exports = {throwNewError, handleError};