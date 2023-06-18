const io = require('socket.io')(5001, {
  cors: {
    origin: 'http://34.220.229.58:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

module.exports = io;