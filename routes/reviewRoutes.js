// routes.js
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const reviewController = require("../controllers/reviewController");

// Protected routes for reviews
router.post("/reviews", authenticate, reviewController.createReview);
router.get("/reviews", reviewController.getAllReviews);
router.get("/reviews/:reviewId", reviewController.getReviewById);
router.put("/reviews/:reviewId", authenticate, reviewController.updateReview);
router.delete(
  "/reviews/:reviewId",
  authenticate,
  reviewController.deleteReview
);

module.exports = router;
