const driverPositions = require('./state');

function handleConnection(socket, driverPositions) {
    // Send current state to new client
    socket.emit('initial-state', Array.from(driverPositions.values()));
  
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  }
  
  // called by Kafka consumer
  function broadcastToClients(data, io) {
    driverPositions.set(data.Driver, data);
    io.emit('position-update', data);
  }
  
  module.exports = { handleConnection, broadcastToClients };