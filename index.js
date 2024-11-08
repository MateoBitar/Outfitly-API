// server.js

// Importing required dependencies
const express = require('express');
const dotenv = require('dotenv');

// Importing route modules for different API endpoints
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const weekRoutes = require('./routes/weekRoutes');
const itemRoutes = require('./routes/itemRoutes');
const outfitRoutes = require('./routes/outfitRoutes');
const outfitSuggestionRoutes = require('./routes/outfit_suggestRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const attendsRoutes = require('./routes/attendsRoutes');
const associatedwithRoutes = require('./routes/associatedwithRoutes');
const containsRoutes = require('./routes/containsRoutes');
const relatedtoRoutes = require('./routes/relatedtoRoutes');

// Load environment variables from the .env file
dotenv.config();

// Initialize Express application
const app = express();

// Middleware for parsing JSON request bodies, with a 5MB size limit
app.use(express.json({ limit: '5mb' }));

// Set up API routes with prefixed paths for better organization
app.use('/outfitly/users', userRoutes); // Route for user-related operations
app.use('/outfitly/events', eventRoutes); // Route for event-related operations
app.use('/outfitly/weeks', weekRoutes); // Route for week-related operations
app.use('/outfitly/items', itemRoutes); // Route for item-related operations
app.use('/outfitly/outfits', outfitRoutes); // Route for outfit-related operations
app.use('/outfitly/outfitsuggestions', outfitSuggestionRoutes); // Route for outfit suggestions
app.use('/outfitly/schedule', scheduleRoutes); // Route for scheduling-related operations
app.use('/outfitly/attends', attendsRoutes); // Route for attendances-related operations
app.use('/outfitly/associations', associatedwithRoutes); // Route for associations-related operations
app.use('/outfitly/contains', containsRoutes); // Route for contains-related operations
app.use('/outfitly/relations', relatedtoRoutes); // Route for relations-related operations

// Root route for basic server check or welcome message
app.get('/', (req, res) => {
    res.send('Welcome to the User API');
});
  
// 404 Handler for any unmatched routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});
  
// Global Error Handler for any uncaught errors during request processing
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err); // Log the error details
    res.status(500).json({ message: 'Internal server error' }); // Send a generic server error response
});
  
// Start the server on the port defined in the .env file
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log server startup message
});
