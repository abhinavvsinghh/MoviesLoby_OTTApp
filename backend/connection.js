const mongoose = require("mongoose");

// Connection with MongoDB
async function connectMongoDB(DB_CONNECTION) {
  return mongoose.connect(DB_CONNECTION);
}

module.exports = { connectMongoDB };
