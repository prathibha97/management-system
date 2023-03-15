const io = require('socket.io')(5001, {
  cors: {
    origin: 'http://35.89.15.70:5000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

module.exports = io;