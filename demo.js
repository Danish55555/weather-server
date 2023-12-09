const mqtt = require('mqtt');

const mqttBrokerUrl = 'mqtt://localhost:1883'; // Replace with your VerneMQ broker address
const topic = 'your/topic'; // Replace with the actual topic

// Create an MQTT client
const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Publish a message to the specified topic
  const message = `${crypto.randomUUID()}`;
  mqttClient.publish(topic, message, (error) => {
    if (!error) {
      console.log(`Message published to topic '${topic}': ${message}`);
      mqttClient.end(); // Close the MQTT client connection
    } else {
      console.error('Error publishing message:', error);
      mqttClient.end(); // Close the MQTT client connection
    }
  });
});

mqttClient.on('error', (error) => {
  console.error('MQTT client error:', error);
});
