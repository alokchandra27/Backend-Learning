const express = require("express");
const ConnectedToDB = require("./db/db");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config()

const app = express();
ConnectedToDB()
app.use(express.json())

app.use("/api/auth",authRoutes)
module.exports = app;


