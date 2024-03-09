const mongoose = require("mongoose");

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Creating a 'Admin' model based on the defined schema
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
