const express = require("express");
const ConnectedToDB = require("./db/db");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
require("dotenv").config()
const cookieParser = require("cookie-parser")

const app = express();
ConnectedToDB()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)
module.exports = app;


