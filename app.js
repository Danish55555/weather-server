const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const weatherRouter = require("./routes/weatherRouter");
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
