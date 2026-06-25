const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  console.log("This middleware between router and API");
  next();
});

router.get("/", (req, res) => {
  res.json({
    message: "Hello from then Server",
  });
});

module.exports = router;
