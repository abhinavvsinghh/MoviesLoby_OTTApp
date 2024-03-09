const express = require("express");
const router = express.Router();

const {
  handleAdminRegistration,
  handleAdminLogin,
} = require("../controllers/authController");

// Route for admin registration
router.post("/register", handleAdminRegistration);

// Route for admin login
router.post("/login", handleAdminLogin);

module.exports = router;
