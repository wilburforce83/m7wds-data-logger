const express = require("express");
require('dotenv').config();
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const JSONdb = require("simple-json-db");
const logGETRequests = require('./logging/requestLogger');
const { services } = require("./services/services");
const { removeOutliers } = require("./utils/dataProcessing"); // Import your data processing function

// Start data services
services();

// Enable CORS for all routes
app.use(cors());
// Enable logging to all routes
app.use(logGETRequests);

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define your API key
const apiKey = process.env.API_KEY;

console.log('API_KEY:', apiKey);

// Middleware to check API key
const apiKeyMiddleware = (req, res, next) => {
  const apiKeyHeader = req.headers["x-api-key"];
  if (!apiKeyHeader || apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// Apply the API key middleware to the routes that need protection
app.use("/auth", apiKeyMiddleware);

// API Key route example
app.get("/auth/data", (req, res) => {
  let db = new JSONdb(`./db/uTdb.json`);
  let result = db.JSON(); // Example of accessing data with API key protection
  result.geoData = removeOutliers(result.geoData); // Remove outliers
  res.json(result);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
