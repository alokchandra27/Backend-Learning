const express = require('express');
const ConnectToDB = require("./db/db");

const app = express();

ConnectToDB()

module.exports = app