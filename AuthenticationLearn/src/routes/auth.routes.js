const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({
    username: username,
    password: password,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token",token)

  res.status(201).json({
    message: "User Registered Successfully",
    user,
    // token,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const isUserExist = await userModel.findOne({
    username: username,
  });

  if (!isUserExist) {
    return res.status(401).json({
      message: "Invalid Username",
    });
  }

  const isPasswordValid = password == isUserExist.password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  res.status(201).json({
    message: "User Logged In",
    isUserExist,
  });
});

router.get("/user", async (req, res) => {
//   const { token } = req.body;
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // res.send(decoded);

    const user = await userModel.findOne({
        _id:decoded.id
    }).select("-password")

    res.status(201).json({
        message:"User data fetched successfully",
        user
    })
  } catch (error) {
    return res.status(401).json({
        message:"Unauthorized (Invalid Token)"
    })
  }
});



module.exports = router;
