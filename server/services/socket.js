const io = require('socket.io')(5001, {
  cors: {
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

module.exports = io;