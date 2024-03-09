const Movie = require("../models/movieModel");

// List all movies
async function handleListMovies(req, res) {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      movies,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

// Search for movies by title or genre
async function handleSearchMovies(req, res) {
  const query = req.query.q;
  try {
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({
      movies,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Add a new movie (requires admin role)
async function handleAddMovies(req, res) {
  try {
    const movie = new Movie(req.body);
    const newMovie = await movie.save();
    res.status(201).json({ movie: newMovie });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Update an existing movie (requires admin role)
async function handleUpdateMovies(req, res) {
  const id = req.params.id;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ movie: updatedMovie });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Delete a movie (requires admin role)
async function handleDeleteMovies(req, res) {
  const id = req.params.id;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  handleListMovies,
  handleSearchMovies,
  handleAddMovies,
  handleUpdateMovies,
  handleDeleteMovies,
};
