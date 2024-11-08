const express = require('express');
const { validateAddOutfit, validateSaveOutfit, validateOutfitId } = require('../validators/outfitDTO');
const outfitController = require('../controllers/outfitController');

const router = express.Router();

// POST route to add a new outfit
// Validates the incoming data before passing it to the controller
router.post('/', validateAddOutfit, (req, res) => outfitController.addOutfit(req, res));

// GET route to fetch all outfits
// Calls the controller to fetch the outfits
router.get('/', (req, res) => outfitController.getAllOutfits(req, res));

// GET route to fetch a specific outfit by ID
// The 'validateOutfitId' middleware ensures that the 'id' parameter is valid before passing to the controller
router.get('/:id', validateOutfitId, (req, res) => outfitController.getOutfitById(req, res));

// PUT route to update an existing outfit by ID
// Validates the 'id' and outfit data, then calls the controller to save the changes
router.put('/:id', [validateOutfitId, validateSaveOutfit], (req, res) => outfitController.saveOutfit(req, res));

// DELETE route to remove an outfit by ID
// Validates the 'id' parameter before passing it to the controller
router.delete('/:id', validateOutfitId, (req, res) => outfitController.deleteOutfit(req, res));

module.exports = router;
