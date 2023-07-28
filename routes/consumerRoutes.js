// routes.js
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const consumerController = require("../controllers/consumerController");

// Protected routes for consumers
router.post('/consumers', authenticate, consumerController.createConsumer);
router.get('/consumers', consumerController.getAllConsumers);
router.get('/consumers/:consumerId', consumerController.getConsumerById);
router.put('/consumers/:consumerId', authenticate, consumerController.updateConsumer);
router.delete('/consumers/:consumerId', authenticate, consumerController.deleteConsumer);

module.exports = router;