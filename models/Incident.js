const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    severity: {
        type: String,
        required: [true, 'Severity is required'],
        enum: {
            values: ['Low', 'Medium', 'High'],
            message: 'Severity must be either: Low, Medium, or High'
        }
    },
    reported_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false,
    versionKey: false
});

// Transform the document before sending to client
incidentSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
    }
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;