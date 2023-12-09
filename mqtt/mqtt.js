const mqtt = require('mqtt');
const mqttBrokerUrl = 'mqtt://localhost:1883';
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