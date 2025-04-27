const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const incidentRoutes = require('./routes/incidentRoutes');
const { errorHandler } = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/incidents', incidentRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the AI Safety Incident Log API' });
});

// 404 handler
app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

// Error handler middleware (should be last)
app.use(errorHandler);

module.exports = app;