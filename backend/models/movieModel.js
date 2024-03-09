const mongoose = require("mongoose");

// Movie Schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  streamingLink: {
    type: String,
    required: true,
  },
});

// Creating a 'Movie' model based on the defined schema
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
