const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const Pusher = require('pusher');
const api = require('./routes/api')
const {errorHandler,notFound} = require('./middleware/error.middleware')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

app.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const authResponse = pusher.authorizeChannel(socketId, channel);
  res.send(authResponse);
  console.log(socketId);
});

app.use('/api', api)

if(process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build'));
  });
}

app.use(notFound);
app.use(errorHandler)
module.exports = app