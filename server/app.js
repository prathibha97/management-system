const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app