const { Kafka } = require('kafkajs');
// const config = require('./config'); 
const { broadcastToClients } = require('../websocket/handlers');

// console.log(config)
config = {
    brokers: ["pkc-ldvj1.ap-southeast-2.aws.confluent.cloud:9092"],
    ssl: true,
    sasl: {
        mechanism: 'PLAIN',
        username: '2FPJZWYXLZ5YLX5O',
        password: '4yfgzNUItElyWbHFpiuMYoxsaxQI8Lk0/rjy57VLvXgN5Vbx8U997Ieazz5hkTxE'
    }
}
const kafka = new Kafka(config);


const consumer = kafka.consumer({
  groupId: 'f1-realtime-group', // consumer group
  sessionTimeout: 30000,
  heartbeatInterval: 10000
});

async function startConsumer(io) {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'f1_positions', fromBeginning: false });

    console.log('Connected to Confluent Cloud Kafka');
    
    await consumer.run({
      eachMessage: async ({ message }) => {
        const driverData = JSON.parse(message.value.toString());
        broadcastToClients(driverData, io);
      },
    });
  } catch (error) {
    console.error('Kafka connection error:', error);
    process.exit(1); // Restart in production (use PM2/Nodemon)
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  await consumer.disconnect();
});

module.exports = startConsumer;