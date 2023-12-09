const express = require('express')
const app = express();
const { createUser } = require("../controllers/user.controller");
app.post("/", createUser)
module.exports = app;