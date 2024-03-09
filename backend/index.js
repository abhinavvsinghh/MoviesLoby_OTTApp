const express = require("express");
const cors = require("cors");
require("dotenv/config");

const { connectMongoDB } = require("./connection");
const authRoutes = require("./routes/authRoute");
const movieRoutes = require("./routes/movieRoute");

// Initialize express app
const app = express();

// Constants
const PORT = process.env.PORT;
const DB_CONNECTION = process.env.DB_CONNECTION;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection to MongoDB
connectMongoDB(DB_CONNECTION)
  .then(() => {
    console.log("Connected with DB");
  })
  .catch((error) => {
    console.log("Mongo Error: ", error);
  });

// Routes
app.use(authRoutes);
app.use("/movies", movieRoutes);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}`);
});

module.exports = server;