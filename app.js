require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const express = require('express');
const app = express();
const port = process.env.DEV_PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const weatherRouter = require("./routes/weatherRouter");
const userRouter = require("./routes/userRouter");
const morgan = require('morgan');

// Set up MQTT client
require("./mqtt/mqtt");


//Necessary Middlwares
app.use(express.json({ limit: '2250mb' }));
app.use(express.urlencoded({ limit: '2250mb', extended: 'true' }));


app.use(cors());
app.use(cookieParser())
app.use(morgan('dev'))

//Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Weather App Server');
});

app.use("/weather", weatherRouter);
app.use("/user", userRouter);
//Connect to MONGODB-CLUSTER
mongoose.connect(mongoURI).then(() => console.log('Connected to MongoDB!')).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
