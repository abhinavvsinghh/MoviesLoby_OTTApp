/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../index");

describe("Movie Endpoints", () => {
  let movieId;
  let adminToken;

  beforeAll(async () => {
    // Register an admin for testing protected routes
    const adminResponse = await request(app).post("/login").send({
      username: "admin",
      password: "admin",
    });
    adminToken = adminResponse.body.token;
  });

  beforeEach(async () => {
    const newMovie = await request(app)
      .post("/movies")
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({
        title: "The Lord of the Rings: The Fellowship of the Ring",
        genre: "Fantasy",
        rating: 8.8,
        streamingLink: "https://www.primevideo.com/title/tt0120737",
      });
    movieId = newMovie.body.movie._id;
  });

  it("should return a list of all movies (GET /movies)", async () => {
    const response = await request(app).get("/movies");
    expect(response.statusCode).toBe(200);
    expect(response.body.movies).toBeInstanceOf(Array);
  });

  it("should search for movies by title (GET /movies/search?q=title)", async () => {
    const response = await request(app).get("/movies/search?q=Rings");
    expect(response.statusCode).toBe(200);
    expect(response.body.movies.length).toBeGreaterThanOrEqual(1);
  });

  it("should create a new movie (POST /movies)", async () => {
    const response = await request(app)
      .post("/movies")
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({
        title: "Pulp Fiction",
        genre: "Crime",
        rating: 8.9,
        streamingLink: "https://www.netflix.com/title/tt0118979",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.movie).toBeDefined();
  });

  it("should update an existing movie (PUT /movies/:id)", async () => {
    const response = await request(app)
      .put(`/movies/${movieId}`)
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({
        title: "The Lord of the Rings: The Two Towers",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.movie.title).toBe(
      "The Lord of the Rings: The Two Towers"
    );
  });

  it("should delete a movie (DELETE /movies/:id)", async () => {
    const response = await request(app)
      .delete(`/movies/${movieId}`)
      .set({ Authorization: `Bearer ${adminToken}` });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Movie deleted successfully");
  });
});
