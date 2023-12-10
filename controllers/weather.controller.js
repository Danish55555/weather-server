const express = require("express");
const app = express();
const apiResponse = require("../apiResponse/apiResponse");
const {readPoint} = require("../influx/influx");
exports.getAllWeatherData = async (req, res) => {
    await readPoint();
    const data = [
        { id: 1, name: "Danish Ali", position: "Full Stack Software Developer" },
        { id: 2, name: "Namra Saeed", position: "Full Stack Software Developer" },
    ]
    apiResponse.success(res, req, data)
}