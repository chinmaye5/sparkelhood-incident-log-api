require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const Incident = require('../models/Incident');

// Sample incidents
const incidents = [
    {
        title: "Unauthorized Data Access",
        description: "AI system accessed restricted data beyond its authorization scope due to a permission fault.",
        severity: "High",
        reported_at: new Date('2025-04-01T14:30:00Z')
    },
    {
        title: "Algorithm Bias Detected",
        description: "Machine learning model showed significant bias in recommendations based on demographic data.",
        severity: "Medium",
        reported_at: new Date('2025-03-28T09:15:00Z')
    },
    {
        title: "System Response Degradation",
        description: "AI assistant exhibited slower response times after processing complex ethical queries.",
        severity: "Low",
        reported_at: new Date('2025-03-25T16:45:00Z')
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Clear existing data
        await Incident.deleteMany({});
        console.log('Database cleared');

        // Create incidents
        await Incident.insertMany(incidents);
        console.log(`${incidents.length} incidents created`);

        console.log('Database seeded successfully');

        // Close connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();