const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const api = require('./routes/api')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api', api)

if(process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build'));
  });
}

module.exports = app