// consumerController.js
const Consumer = require("../models/Consumer");

// Controller functions
const createConsumer = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    // Check if the consumer already exists
    const existingConsumer = await Consumer.findOne({ email });
    if (existingConsumer) {
      return res.status(400).json({ message: "Consumer already exists" });
    }

    // Create a new consumer
    const consumer = new Consumer({
      name,
      email,
      password,
      location,
    });

    // Save the consumer to the database
    await consumer.save();

    res
      .status(201)
      .json({ message: "Consumer created successfully", consumer });
  } catch (error) {
    console.error("Error creating consumer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllConsumers = async (req, res) => {
  try {
    // Fetch all consumers from the database
    const consumers = await Consumer.find();

    res.status(200).json({ consumers });
  } catch (error) {
    console.error("Error getting consumers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getConsumerById = async (req, res) => {
  try {
    const { consumerId } = req.params;

    // Fetch the consumer from the database
    const consumer = await Consumer.findById(consumerId);

    if (!consumer) {
      return res.status(404).json({ message: "Consumer not found" });
    }

    res.status(200).json({ consumer });
  } catch (error) {
    console.error("Error getting consumer by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateConsumer = async (req, res) => {
  try {
    const { consumerId } = req.params;
    const { name, email, password, location } = req.body;

    // Find the consumer by ID
    const consumer = await Consumer.findById(consumerId);

    if (!consumer) {
      return res.status(404).json({ message: "Consumer not found" });
    }

    // Update the consumer's fields
    consumer.name = name;
    consumer.email = email;
    consumer.password = password;
    consumer.location = location;
    consumer.updatedAt = Date.now();

    // Save the updated consumer to the database
    await consumer.save();

    res
      .status(200)
      .json({ message: "Consumer updated successfully", consumer });
  } catch (error) {
    console.error("Error updating consumer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteConsumer = async (req, res) => {
  try {
    const { consumerId } = req.params;

    // Find the consumer by ID and remove it from the database
    await Consumer.findByIdAndRemove(consumerId);

    res.status(200).json({ message: "Consumer deleted successfully" });
  } catch (error) {
    console.error("Error deleting consumer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Export the controller functions
module.exports = {
  createConsumer,
  getAllConsumers,
  getConsumerById,
  updateConsumer,
  deleteConsumer,
};
