// controllers/outfitController.js
const outfitService = require('../services/outfitService'); // Import the outfit service
const userService = require('../services/userService'); // Import the user service to validate user existence

class OutfitController {

    // Add a new outfit
    async addOutfit(req, res) {
        try {
            const { name, image, details, weather, user_id } = req.body;
            
            // Check if the user exists
            const user = await userService.getUserById(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Create and add the outfit
            const newOutfit = await outfitService.addOutfit({ name, image, details, weather, user_id });
            res.status(201).json(newOutfit);
        } catch (e) {
            console.error('Error creating outfit:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Retrieve all outfits
    async getAllOutfits(req, res) {
        try {
            const outfits = await outfitService.getAllOutfits();
            res.status(200).json(outfits);
        } catch (e) {
            console.error('Error fetching outfits:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Retrieve a specific outfit by ID
    async getOutfitById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const outfit = await outfitService.getOutfitById(id);

            if (!outfit) {
                return res.status(404).json({ message: 'Outfit not found' });
            }

            res.status(200).json(outfit);
        } catch (e) {
            console.error('Error fetching outfit:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Update an outfit by ID
    async saveOutfit(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { name, image, details, weather, user_id } = req.body;

            // Check if the user exists
            const user = await userService.getUserById(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the outfit
            const success = await outfitService.saveOutfit(id, { name, image, details, weather, user_id });
            if (!success) {
                return res.status(404).json({ message: 'Outfit not found or no changes made' });
            }

            res.status(200).json({ message: 'Outfit updated successfully' });
        } catch (e) {
            console.error('Error saving outfit:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Delete an outfit by ID
    async deleteOutfit(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await outfitService.deleteOutfit(id);

            if (!success) {
                return res.status(404).json({ message: 'Outfit not found' });
            }

            res.status(200).json({ message: 'Outfit deleted successfully' });
        } catch (e) {
            console.error('Error deleting outfit:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new OutfitController(); // Export a singleton instance of OutfitController
