// reviewController.js
const Review = require("../models/Review");

// Controller functions
const createReview = async (req, res) => {
  try {
    const { title, content, rating, productId } = req.body;

    // Create a new review
    const review = new Review({
      title,
      content,
      rating,
      product: productId,
    });

    // Save the review to the database
    await review.save();

    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    // Fetch all reviews from the database
    const reviews = await Review.find().populate("product", "name");

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Fetch the review from the database
    const review = await Review.findById(reviewId).populate("product", "name");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ review });
  } catch (error) {
    console.error("Error getting review by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { title, content, rating } = req.body;

    // Find the review by ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the review's fields
    review.title = title;
    review.content = content;
    review.rating = rating;
    review.updatedAt = Date.now();

    // Save the updated review to the database
    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Find the review by ID and remove it from the database
    await Review.findByIdAndRemove(reviewId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Export the controller functions
module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
