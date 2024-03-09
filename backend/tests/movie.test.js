/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Movie = require("../models/movieModel");

// Connect to an in-memory MongoDB database for testing
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/movie-lobby-test");
});

afterEach(async () => {
  await Movie.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Movie Model", () => {
  it("should create a new movie", async () => {
    const newMovie = new Movie({
      title: "The Shawshank Redemption",
      genre: "Drama",
      rating: 9.3,
      streamingLink: "https://www.netflix.com/title/tt0111161",
    });
    await newMovie.save();
    const movies = await Movie.find();
    expect(movies.length).toBe(1);
    // expect(movies[0]).toEqual(expect.objectContaining(newMovie));
    expect(movies[0]).toMatchObject({
      title: newMovie.title,
      genre: newMovie.genre,
      rating: newMovie.rating,
      streamingLink: newMovie.streamingLink,
    });
  });

  it("should not create a new movie with missing required fields", async () => {
    const newMovie = new Movie({ genre: "Comedy" });
    await expect(newMovie.save()).rejects.toThrowError();
  });

  it("should update an existing movie", async () => {
    const newMovie = new Movie({
      title: "The Godfather",
      genre: "Crime",
      rating: 9.2,
      streamingLink: "https://www.hulu.com/the-godfather",
    });
    await newMovie.save();

    newMovie.title = "The Godfather Part II";
    await newMovie.save();

    const updatedMovie = await Movie.findById(newMovie._id);
    expect(updatedMovie.title).toBe("The Godfather Part II");
  });

  it("should delete an existing movie", async () => {
    const newMovie = new Movie({
      title: "The Dark Knight",
      genre: "Action",
      rating: 9.0,
      streamingLink: "https://www.hbomax.com/the-dark-knight",
    });
    await newMovie.save();

    await Movie.findByIdAndDelete(newMovie._id);

    const movies = await Movie.find();
    expect(movies.length).toBe(0);
  });
});
