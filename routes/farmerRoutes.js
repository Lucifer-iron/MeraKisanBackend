const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const farmerController = require("../controllers/farmerController");



// Protected routes for farmers
router.post('/farmers', authenticate, farmerController.createFarmer);
router.get('/farmers', farmerController.getAllFarmers);
router.get('/farmers/:farmerId', farmerController.getFarmerById);
router.put('/farmers/:farmerId', authenticate, farmerController.updateFarmer);
router.delete('/farmers/:farmerId', authenticate, farmerController.deleteFarmer);

module.exports = router;