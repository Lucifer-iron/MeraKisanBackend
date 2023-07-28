// productController.js
const Product = require("../models/Product");

// Controller functions
const createProduct = async (req, res) => {
  try {
    const { name, description, price, farmerId } = req.body;

    // Create a new product
    const product = new Product({
      name,
      description,
      price,
      farmer: farmerId,
    });

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find().populate("farmer", "name");

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch the product from the database
    const product = await Product.findById(productId).populate(
      "farmer",
      "name"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error getting product by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product's fields
    product.name = name;
    product.description = description;
    product.price = price;
    product.updatedAt = Date.now();

    // Save the updated product to the database
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product by ID and remove it from the database
    await Product.findByIdAndRemove(productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Export the controller functions
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
