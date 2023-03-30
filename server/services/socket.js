const io = require('socket.io')(5001, {
  cors: {
    origin: 'https://management-system-b022.onrender.com',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

module.exports = io;