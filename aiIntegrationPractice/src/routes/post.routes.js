const express = require("express");
const { createPost } = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({storage:multer.memoryStorage()})
router.post("/", 
    authMiddleware,
    upload.single("image"),
     createPost);

module.exports = router;
