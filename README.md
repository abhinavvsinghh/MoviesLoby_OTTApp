# Movie Lobby API

This API provides functionality for managing a movie lobby for OTT applications. It allows users to list movies, search for movies by title or genre, add new movies, update existing movie information, and delete movies from the lobby.

## Table of Contents

- [Setup](#setup)
- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
  - [Sample Requests and Responses](#sample-requests-and-responses)
- [Testing](#testing)
- [Additional Notes](#additional-notes)

## Setup

To set up and run the API on your local machine, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/abhinavvsinghh/MoviesLoby_OTTApp.git

   ```

2. **Install Dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Set Environment Variables:**
   Create a `.env` file inside the backend folder and add the following variables:

   ```plaintext
   PORT=<port>
   DB_CONNECTION=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   ```

4. **Start the Server:**
   ```bash
   npm start
   ```

## API Documentation

### Endpoints:

- `GET /movies`: List all the movies in the lobby.
- `GET /movies/search?q={query}`: Search for a movie by title or genre.
- `POST /movies`: Add a new movie to the lobby (requires "admin" role).
- `PUT /movies/:id`: Update an existing movie's information (title, genre, rating, or streaming link) (requires "admin" role).
- `DELETE /movies/:id`: Delete a movie from the lobby (requires "admin" role).

### Sample Requests and Responses:

**List all movies:**

```plaintext
GET: /movies
Response: {
    "movies": [
        {
            "_id": "65ec06a93bc7e0c7baee2db5",
            "title": "Inception",
            "genre": "Sci-Fi",
            "rating": 9,
            "streamingLink": "https://example.com/inception",
            "__v": 0
        },
        ...
    ]
}
```

**Search for movies:**

```plaintext
GET: /movies/search?q=Action
Response: {
    "movies": [
        {
            "_id": "65ec0b00e33bb5303b04e436",
            "title": "Jawan",
            "genre": "Action",
            "rating": 9.3,
            "streamingLink": "https://example.com/Jawan",
            "__v": 0
        },
        {
            "_id": "65ec2475306d68feaa5d835c",
            "title": "Pathaan",
            "genre": "Action",
            "rating": 9.3,
            "streamingLink": "https://example.com/Pathaan",
            "__v": 0
        }
    ]
}
```

**Add a new movie:**

```plaintext
POST: /movies
Request Body: {
    "title": "Dunki",
    "genre": "Drama",
    "rating": 9.3,
    "streamingLink": "https://example.com/Dunki"
}
Response: {
    "movie": {
        "title": "Dunki",
        "genre": "Drama",
        "rating": 9.3,
        "streamingLink": "https://example.com/Dunki",
        "_id": "65ec553c625eee58a489ac67",
        "__v": 0
    }
}
```

**Update an existing movie's information:**

```plaintext
PUT: /movies/65ec553c625eee58a489ac67
Request Body: {
    "rating": 8.5
}
Response: {
    "movie": {
        "_id": "65ec553c625eee58a489ac67",
        "title": "Dunki",
        "genre": "Drama",
        "rating": 8.5,
        "streamingLink": "https://example.com/Dunki",
        "__v": 0
    }
}
```

**Delete a movie:**

```plaintext
DELETE: /movies/65ec553c625eee58a489ac67
Response: {
    "message": "Movie deleted successfully"
}
```

## Testing

You can find the unit tests and integration tests inside the `tests` folder. I have used `Jest` testing framework. Run tests using the following command:

```bash
npm run test
```

## Additional Notes

- To get the `admin` access.

  - 1. Send a `POST` request to the `/register` endpoint with the following payload:

  ```plaintext
  Request Body: {
    "username": "your_username",
    "password": "your_password"
  }

  Response: {
    "message": "Admin registered successfully"
  }
  ```

  - 2. Send a `POST` request to the `/login` endpoint with the following payload:

  ```plaintext
  Request Body: {
    "username": "your_username",
    "password": "your_password"
  }

  Response: {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVjMWQ0MTIxODJlN2VlMTliMTQzZDEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MDk5ODQ4MDIsImV4cCI6MTcxMDA3MTIwMn0.ZnYZcr8NUMAzZ8QeUimaqmNTmOiu8HyDVH1sgFfJQPI"
  }
  ```

  - 3. Copy the `JWT token` from the response.

  - 4. Send requests to the endpoints that require `admin access` by adding the `Bearer Token` in the `Authorization`

- Ensure MongoDB is running locally or provide a valid connection string.
- Use an API testing tool like Postman or Insomnia to interact with the endpoints
