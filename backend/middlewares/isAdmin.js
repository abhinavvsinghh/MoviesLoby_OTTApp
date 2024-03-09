const jwt = require("jsonwebtoken");

function isAdmin(req, res, next) {
  try {
    // Extract authorization header and bearer token
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token using a secret key (stored securely)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user has admin role based on decoded data
    if (!decoded.isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden: Requires admin role" });
    }
    // If valid, allow the request to proceed
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
}

module.exports = isAdmin;
