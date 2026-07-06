const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, password } = req.body;

  const isUserExist = await userModel.findOne({
    username: username,
  });

  if (isUserExist) {
    return res.status(409).json({
      message: "Username Already Exist",
    });
  }

  const user = await userModel.create({
    username: username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Registered Successfully",
  });
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username: username,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid Username",
    });
  }

  const isPasswordExist = await bcrypt.compare(password, user.password);

  if (!isPasswordExist) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token",token)

  res.status(201).json({
    message: "User Logged In successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
};
