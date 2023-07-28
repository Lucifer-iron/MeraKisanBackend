// authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Farmer = require("../models/Farmer");
const Consumer = require("../models/Consumer");

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role, // assuming you have a 'role' field in the user model
  };

  const options = {
    expiresIn: "1d", // adjust the expiration time as per your requirements
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};


//register user
const register = async (req, res) => {
  const { name,email, password, role } = req.body;

  try {
    // Check if the user already exists
    const userExists = await (role === "farmer" ? Farmer : Consumer).findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new (role === "farmer" ? Farmer : Consumer)({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await Farmer.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
};
