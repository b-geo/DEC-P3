const {Kafka} = require('kafkajs');
const {broadcastToClients} = require('../websocket/handlers');
const config = require('./config');

const kafka = new Kafka(config);

const consumer = kafka.consumer({
	groupId: 'f1-realtime-group', // Consumer group
	sessionTimeout: 30_000,
	heartbeatInterval: 10_000,
});

async function startConsumer(io) {
	try {
		await consumer.connect();
		await consumer.subscribe({topic: 'f1_tele', fromBeginning: false});

		console.log('Connected to Confluent Cloud Kafka');

		await consumer.run({
			async eachMessage({message}) {
				const driverData = JSON.parse(message.value.toString());
				broadcastToClients(driverData, io);
			},
		});
	} catch (error) {
		console.error('Kafka connection error:', error);
		process.exit(1);
	}
}

// Shutdown properly
process.on('SIGTERM', async () => {
	await consumer.disconnect();
});

module.exports = startConsumer;
