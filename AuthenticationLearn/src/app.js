const express = require('express');
const ConnectToDB = require("./db/db");
const authRoute = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json())
app.use(cookieParser())
ConnectToDB()

app.use("/auth",authRoute)

module.exports = app