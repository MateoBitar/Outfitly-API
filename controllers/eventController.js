// controllers/eventController.js
const eventService = require('../services/eventService');  // Import the eventService to handle the logic

class EventController  {

    // Method to add a new event
    async addEvent(req, res) {
        try {
            const {name, desc} = req.body;  // Destructure name and description from request body
            const newEvent = await eventService.addEvent({ name, desc });  // Call eventService to add the event
            res.status(201).json(newEvent);  // Return the newly created event with status 201
        } catch (e) {
            console.error('Error creating event:', e);  // Log error if event creation fails
            res.status(500).json({ message: 'Internal server error' });  // Return error message if an exception occurs
        }
    }

    // Method to get all events
    async getAllEvents(req, res) {
        try {
            const events = await eventService.getAllEvents();  // Fetch all events from the service
            res.status(200).json(events);  // Return the list of events with status 200
        } catch (e) {
            console.error('Error fetching events:', e);  // Log error if fetching events fails
            res.status(500).json({ message: 'Internal server error' });  // Return error message if an exception occurs
        }
    }

    // Method to get an event by its ID
    async getEventById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);  // Parse the ID from the URL parameters
            const event = await eventService.getEventById(id);  // Fetch event by ID from the service
            if (!event) {
                res.status(404).json({ message: 'Event not found' });  // Return 404 if event is not found
            }
            res.status(200).json(event);  // Return the event if found
        } catch (e) {
            console.error('Error fetching event:', e);  // Log error if fetching the event fails
            res.status(500).json({ message: 'Internal server error' });  // Return error message if an exception occurs
        }
    }

    // Method to update an event by its ID
    async saveEvent(req, res) {
        try {
            const id = parseInt(req.params.id, 10);  // Parse the ID from the URL parameters
            const {name, desc} = req.body;  // Destructure name and description from request body
            const success = await eventService.saveEvent(id, { name, desc });  // Call eventService to update the event
            if (!success) {
                return res.status(404).json({ message: 'Event not found or no changes made' });  // Return 404 if no update occurred
            }
            res.status(200).json({ message: 'Event updated successfully'});  // Return success message if the event is updated
        } catch (e) {
            console.error('Error saving event:', e);  // Log error if saving the event fails
            res.status(500).json({ message: 'Internal server error' });  // Return error message if an exception occurs
        }
    }

    // Method to delete an event by its ID
    async deleteEvent(req, res) {
        try {
            const id = parseInt(req.params.id, 10);  // Parse the ID from the URL parameters
            const success = await eventService.deleteEvent(id);  // Call eventService to delete the event
            if (!success) {
                return res.status(404).json({ message: 'Event not found' });  // Return 404 if the event is not found
            }
            res.status(200).json({ message: 'Event deleted successfully'});  // Return success message if the event is deleted
        } catch (e) {
            console.error('Error deleting event:', e);  // Log error if deleting the event fails
            res.status(500).json({ message: 'Internal server error' });  // Return error message if an exception occurs
        }
    }
}

// Export the EventController instance for use in other parts of the application
module.exports = new EventController();
