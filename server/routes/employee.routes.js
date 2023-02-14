const express = require('express')

const empRouter = express.Router()

empRouter.get('/', (req, res) => {
  res.send('emp Routes')
})

module.exports = empRouter