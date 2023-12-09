const express = require('express');
const mqtt = require('mqtt');
const app = express();
const port = 3000;
const cors = require('cors')
const cookieParser = require('cookie-parser')


const mqttBrokerUrl = 'mqtt://localhost:1883'; // Replace with your VerneMQ broker address
const weatherRouter=require("./routes/weatherRouter");
const morgan = require('morgan')



// Set up MQTT client
const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  // Subscribe to the MQTT topic
  mqttClient.subscribe('your/topic', (error) => {
    if (!error) {
      console.log('Subscribed to MQTT topic: your/topic');
    } else {
      console.error('Error subscribing to MQTT topic:', error);
    }
  });
});

mqttClient.on('message', (topic, message) => {
  // Handle incoming MQTT messages
  console.log(`Received message on topic '${topic}': ${message.toString()}`);
});


app.use(express.json({ limit:'2250mb'})); 
app.use(express.urlencoded({limit: '2250mb', extended: 'true'}));


app.use(cors())

app.use(cookieParser())
app.use(morgan('dev'))
app.get('/', (req, res) => {
  res.send('Welcome to the root URL');
});

app.use("/weather", weatherRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
