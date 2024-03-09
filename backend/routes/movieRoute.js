const express = require("express");
const router = express.Router();

const {
  handleListMovies,
  handleSearchMovies,
  handleAddMovies,
  handleUpdateMovies,
  handleDeleteMovies,
} = require("../controllers/movieController");

const isAdmin = require("../middlewares/isAdmin");

// Route for listing movies
router.get("/", handleListMovies);

// Route for searching movies
router.get("/search", handleSearchMovies);

// Route for adding a movie, requiring admin role
router.post("/", isAdmin, handleAddMovies);

// Route for updating a movie by ID, requiring admin role
router.put("/:id", isAdmin, handleUpdateMovies);

// Route for deleting a movie by ID, requiring admin role
router.delete("/:id", isAdmin, handleDeleteMovies);

module.exports = router;
