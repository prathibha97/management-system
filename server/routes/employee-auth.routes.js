const express = require('express')

const empAuthRouter = express.Router()

empAuthRouter.get('/', (req, res) => {
  res.send('emp auth Routes')
})

module.exports = empAuthRouter