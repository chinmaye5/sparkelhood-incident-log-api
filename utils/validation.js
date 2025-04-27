const Joi = require('joi');

// Validation schema for creating and updating incidents
const incidentSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Title cannot be empty',
        'any.required': 'Title is required'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description cannot be empty',
        'any.required': 'Description is required'
    }),
    severity: Joi.string().valid('Low', 'Medium', 'High').required().messages({
        'string.empty': 'Severity cannot be empty',
        'any.required': 'Severity is required',
        'any.only': 'Severity must be one of: Low, Medium, High'
    })
});

// Validate incident data
const validateIncident = (data) => {
    return incidentSchema.validate(data, { abortEarly: false });
};

module.exports = {
    validateIncident
};