const socketio = require('socket.io');

module.exports = ({server}) => {

  // server-side

  const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: false,
    }
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
  });

  return {
    
  }

}