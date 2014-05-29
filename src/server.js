var st = require('st');
var http = require('http');

// Create HTTP Server
http.createServer(st(process.cwd())).listen(8002);

// Setup Socket.IO
var io = require('socket.io').listen(8001, {
  origins: '*:*'
}),
rhapsody = io.of('/rhapsody').on('connection', function(socket) {
  socket.on('control', function(msg) {
    socket.emit('ack');
    if (typeof msg.action !== 'undefined') {
      socket.broadcast.emit('control', msg.action);
    }
  });
});