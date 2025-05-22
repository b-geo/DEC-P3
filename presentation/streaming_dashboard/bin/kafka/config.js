module.exports = {
	brokers: [process.env.CONFLUENT_BOOTSTRAP_SERVER],
	ssl: true,
	sasl: {
		mechanism: 'PLAIN',
		username: process.env.CONFLUENT_API_KEY,
		password: process.env.CONFLUENT_API_SECRET,
	},
};
