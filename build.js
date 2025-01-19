// Import necessary modules
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Define environment variables
const DB_URI = process.env.DB_URI || 'mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o';

// Function to check database connection
async function checkDatabaseConnection() {
    console.log('Checking database connection...');
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connection successful.');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit with failure
    } finally {
        await mongoose.disconnect();
    }
}

// Function to verify project directory structure
function verifyProjectStructure() {
    console.log('Verifying project directory structure...');
    const requiredFiles = [
        './app/models/bear.js', // Check if the Bear model file exists
        './server.js', // Ensure the main server file exists
    ];

    requiredFiles.forEach((file) => {
        if (!fs.existsSync(file)) {
            console.error(`Missing required file: ${file}`);
            process.exit(1); // Exit with failure
        }
    });

    console.log('Project directory structure is correct.');
}

// Main build function
async function build() {
    console.log('Starting build process...');
    verifyProjectStructure(); // Check the project structure
    await checkDatabaseConnection(); // Verify database connectivity
    console.log('Build process completed successfully!');
}

// Execute the build process
build().catch((err) => {
    console.error('Build process failed:', err);
    process.exit(1); // Exit with failure
});
