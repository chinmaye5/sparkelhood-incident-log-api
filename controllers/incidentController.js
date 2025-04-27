const Incident = require('../models/Incident');
const { validateIncident } = require('../utils/validation');
const { asyncHandler } = require('../middleware/errorHandler');

// Get all incidents
const getAllIncidents = asyncHandler(async (req, res) => {
    const incidents = await Incident.find().sort({ reported_at: -1 });

    res.status(200).json(incidents);
});

// Get a single incident by ID
const getIncidentById = asyncHandler(async (req, res) => {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
        const error = new Error(`Incident with ID ${req.params.id} not found`);
        error.status = 404;
        throw error;
    }

    res.status(200).json(incident);
});

// Create a new incident
const createIncident = asyncHandler(async (req, res) => {
    // Validate request body
    const { error, value } = validateIncident(req.body);

    if (error) {
        throw error;
    }

    // Create new incident
    const incident = await Incident.create({
        title: value.title,
        description: value.description,
        severity: value.severity
        // reported_at will be set automatically by the model's default value
    });

    res.status(201).json(incident);
});

// Delete an incident
const deleteIncident = asyncHandler(async (req, res) => {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
        const error = new Error(`Incident with ID ${req.params.id} not found`);
        error.status = 404;
        throw error;
    }

    await incident.deleteOne();

    res.status(204).end();
});

module.exports = {
    getAllIncidents,
    getIncidentById,
    createIncident,
    deleteIncident
};