// Central error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Default error object
    const error = {
        status: 'error',
        message: err.message || 'Internal server error',
    };

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        error.message = 'Validation error';
        error.errors = Object.values(err.errors).map(e => ({
            field: e.path,
            message: e.message
        }));
        return res.status(400).json(error);
    }

    // Handle Mongoose duplicate key errors
    if (err.code === 11000) {
        error.message = 'Duplicate field value';
        error.field = Object.keys(err.keyValue)[0];
        return res.status(400).json(error);
    }

    // Handle Joi validation errors
    if (err.name === 'ValidationError' && err.details) {
        error.message = 'Validation error';
        error.errors = err.details.map(e => ({
            field: e.path[0],
            message: e.message
        }));
        return res.status(400).json(error);
    }

    // Handle custom application errors
    if (err.status) {
        return res.status(err.status).json({
            status: 'error',
            message: err.message
        });
    }

    // Default to 500 server error
    res.status(500).json(error);
};

// Wrapper to catch async errors
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = {
    errorHandler,
    asyncHandler
};