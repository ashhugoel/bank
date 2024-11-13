const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();

// Log the MongoDB URL for debugging purposes
console.log("MongoDB URL:", process.env.dbUrl);

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all origins temporarily for development
};

// Apply the CORS middleware globally before defining routes
app.use(cors(corsOptions)); // This will allow CORS for all routes

// MongoDB connection
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.dbUrl)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Middleware to parse JSON
app.use(express.json());

// API routes
const policyRoutes = require("./routes/policies");
app.use("/api", policyRoutes);

const userRoute = require("./routes/userData");
app.use("/api", userRoute);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
