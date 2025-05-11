const http = require('http');
const socketIo = require('socket.io');
const { handleConnection } = require('./handlers');
const driverPositions = require('./state');


function setupWebSocket(app) {
  const server = http.createServer(app);
  const io = socketIo(server, {
    cors: {
      origin: "*" // Adjust for production!
    }
  });
  io.on('connection', (socket) => {
    handleConnection(socket, driverPositions);
  });
  return server;
}

module.exports = { setupWebSocket };