const express = require('express');
const router = express.Router();
const {
    getAllIncidents,
    getIncidentById,
    createIncident,
    deleteIncident
} = require('../controllers/incidentController');

// Open routes - no authentication required
router.get('/getAll', getAllIncidents);
router.get('/getById/:id', getIncidentById);
router.post('/create/', createIncident);
router.delete('/deleteById/:id', deleteIncident);

module.exports = router;