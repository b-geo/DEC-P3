const { Kafka } = require('kafkajs');
const config = require('./config'); 
const { broadcastToClients } = require('../websocket/handlers');

const kafka = new Kafka(config);

const consumer = kafka.consumer({
  groupId: 'f1-realtime-group', // consumer group
  sessionTimeout: 30000,
  heartbeatInterval: 10000
});

async function startConsumer(io) {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'f1_tele', fromBeginning: false });

    console.log('Connected to Confluent Cloud Kafka');
    
    await consumer.run({
      eachMessage: async ({ message }) => {
        const driverData = JSON.parse(message.value.toString());
        broadcastToClients(driverData, io);
      },
    });
  } catch (error) {
    console.error('Kafka connection error:', error);
    process.exit(1);
  }
}

// shutdown properly
process.on('SIGTERM', async () => {
  await consumer.disconnect();
});

module.exports = startConsumer;