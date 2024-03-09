const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

// Admin registration
async function handleAdminRegistration(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
}

// Admin login
async function handleAdminLogin(req, res) {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign(
      { userId: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}

module.exports = {
  handleAdminRegistration,
  handleAdminLogin,
};
