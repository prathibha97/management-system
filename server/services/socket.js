const io = require('socket.io')(5001, {
  cors: {
    origin: 'http://ec2-52-88-221-122.us-west-2.compute.amazonaws.com:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

module.exports = io;