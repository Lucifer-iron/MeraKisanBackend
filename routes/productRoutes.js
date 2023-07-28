// routes.js
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");

// Protected routes for products
router.post("/products", authenticate, productController.createProduct);
router.get("/products", productController.getAllProducts);
router.get("/products/:productId", productController.getProductById);
router.put(
  "/products/:productId",
  authenticate,
  productController.updateProduct
);
router.delete(
  "/products/:productId",
  authenticate,
  productController.deleteProduct
);

module.exports = router;
