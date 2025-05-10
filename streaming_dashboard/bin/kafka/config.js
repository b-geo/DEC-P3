module.exports = {
    brokers: process.env.CONFLUENT_BOOTSTRAP_SERVERS,
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username: process.env.CONFLUENT_API_KEY,
      password: process.env.CONFLUENT_API_SECRET
    },
    clientId: 'f1-dashboard-' + Math.random().toString(36).substring(2),
    connectionTimeout: 10000,
    authenticationTimeout: 10000
  };