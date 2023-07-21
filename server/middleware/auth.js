const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userRole = decoded.data.userRole;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: "Invalid token." });
  }
};

exports.isAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.data.userRole != 0) {
      return res.status(403).json({ error: "Access denied. Admin role required." });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Invalid token." });
  }
};
