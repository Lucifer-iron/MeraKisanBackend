const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

//routes import
const farmerRoutes = require("./routes/farmerRoutes");
const consumerRoutes = require("./routes/consumerRoutes");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//database connection
connectDB();

// Use the API routes
app.use("/api", farmerRoutes);
app.use("/api", consumerRoutes);
app.use("/api", productRoutes);
app.use("/api", reviewRoutes);
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/testRoutes"));

// TODO: Define your API routes here

// Start the server
const port = process.env.PORT; // Choose an appropriate port number
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
