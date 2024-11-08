// services/relatedtoService.js
const { initDB } = require('../config/database');  // Import database initialization function
const RelatedTo = require('../models/relatedtoModel');  // Import the RelatedTo model

class RelatedToService {
    constructor() {
        this.pool = null;
        this.init();  // Initialize the database connection when the service is instantiated
    }

    // Initialize the database connection
    async init() {
        this.pool = await initDB();
    }

    // Relate a suggestion to an event
    async relateSuggestionToEvent(relatedtoData) {
        const { event_id, suggest_id } = relatedtoData;  // Destructure event_id and suggest_id from input
        await this.pool.query(
            'INSERT INTO related_to (event_id, suggest_id) VALUES (?, ?)', [event_id, suggest_id]  // Insert relation into database
        );
        return { event_id, suggest_id };  // Return the input data (confirming the relation)
    }

    // Fetch all suggestions related to a specific event
    async getSuggestionsForEvent(event_id) {
        const [rows] = await this.pool.query('SELECT suggest_id FROM related_to WHERE event_id = ?', [event_id]);
        if (rows.length === 0) return null;  // If no suggestions found for the event, return null
        return rows.map(RelatedTo.fromRow);  // Map the rows to RelatedTo model instances
    }

    // Fetch all events related to a specific suggestion
    async getEventsOfSuggestion(suggest_id) {
        const [rows] = await this.pool.query('SELECT event_id FROM related_to WHERE suggest_id = ?', [suggest_id]);
        if (rows.length === 0) return null;  // If no events found for the suggestion, return null
        return rows.map(RelatedTo.fromRow);  // Map the rows to RelatedTo model instances
    }

    // Remove the relationship between a suggestion and an event
    async unrelateSuggestionFromEvent(event_id, suggest_id) {
        const [result] = await this.pool.query('DELETE FROM related_to WHERE event_id = ? AND suggest_id = ?', [event_id, suggest_id]);
        return result.affectedRows > 0;  // Return true if a row was affected
    }
}

module.exports = new RelatedToService();  // Export an instance of the service
