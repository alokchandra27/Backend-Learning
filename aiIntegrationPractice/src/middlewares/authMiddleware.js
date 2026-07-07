const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(409).json({
      message: "Unauthorized access , Please Login First",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      _id: decoded.id,
    });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token , Please Login First",
    });
  }
}

module.exports = authMiddleware;
