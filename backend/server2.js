const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Run when client connects
io.on('connection', (socket) => {
  console.log('new user');

  socket.emit('message', 'Welcome');

  socket.broadcast.emit('message', 'User joined');

  socket.on('disconnect', () => {
    io.emit('message', 'user left the chat');
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
