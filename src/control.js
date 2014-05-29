var io = require('socket.io-client'),
socket = io.connect('http://127.0.0.1:8001/rhapsody');
socket.on('connect', function () {
  if( process.argv[2] == 'pause' ) {
    socket.emit('control', { action: 'pause' });
  } else if( process.argv[2] == 'next' ) {
    socket.emit('control', { action: 'next' });
  } else if( process.argv[2] == 'prev' ) {
    socket.emit('control', { action: 'prev' });
  } else if( process.argv[2] == 'shuffle' ) {
    socket.emit('control', { action: 'shuffle' });
  }
});
socket.on('ack', function () {
  process.exit();
});