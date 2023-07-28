// farmerController.js
const Farmer = require("../models/Farmer");

// Controller functions
const createFarmer = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    // Check if the farmer already exists
    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return res.status(400).json({ message: "Farmer already exists" });
    }

    // Create a new farmer
    const farmer = new Farmer({
      name,
      email,
      password,
      location,
    });

    // Save the farmer to the database
    await farmer.save();

    res.status(201).json({ message: "Farmer created successfully", farmer });
  } catch (error) {
    console.error("Error creating farmer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllFarmers = async (req, res) => {
  try {
    // Fetch all farmers from the database
    const farmers = await Farmer.find();

    res.status(200).json({ farmers });
  } catch (error) {
    console.error("Error getting farmers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getFarmerById = async (req, res) => {
  try {
    const { farmerId } = req.params;

    // Fetch the farmer from the database
    const farmer = await Farmer.findById(farmerId);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json({ farmer });
  } catch (error) {
    console.error("Error getting farmer by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const { name, email, password, location } = req.body;

    // Find the farmer by ID
    const farmer = await Farmer.findById(farmerId);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // Update the farmer's fields
    farmer.name = name;
    farmer.email = email;
    farmer.password = password;
    farmer.location = location;
    farmer.updatedAt = Date.now();

    // Save the updated farmer to the database
    await farmer.save();

    res.status(200).json({ message: "Farmer updated successfully", farmer });
  } catch (error) {
    console.error("Error updating farmer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;

    // Find the farmer by ID and remove it from the database
    await Farmer.findByIdAndRemove(farmerId);

    res.status(200).json({ message: "Farmer deleted successfully" });
  } catch (error) {
    console.error("Error deleting farmer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Export the controller functions
module.exports = {
  createFarmer,
  getAllFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer,
};
