const io = require('socket.io')(5001, {
  cors: {
    origin: 'http://52.88.221.122:5000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

module.exports = io;