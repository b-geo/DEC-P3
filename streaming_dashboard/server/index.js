const http = require('http');
const socketIo = require('socket.io');
const { handleConnection } = require('./websocket/handlers');
const driverPositions = require('./websocket/state');
require('dotenv').config();
const express = require('express');
// const { setupWebSocket } = require('./websocket/server');
const startConsumer = require('./kafka/consumer');

const app = express();
app.use(express.static('public')); // Serve frontend

// Start WebSocket server
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
    origin: "*" // Adjust for production!
    }
});
io.on('connection', (socket) => {
    handleConnection(socket, driverPositions);
});



// Start Kafka consumer
startConsumer(io).catch(console.error);

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});