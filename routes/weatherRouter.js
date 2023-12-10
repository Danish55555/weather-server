const express = require('express')
const app = express();
const { getAllWeatherData } = require("../controllers/weather.controller");
app.get("/", getAllWeatherData)
module.exports = app;