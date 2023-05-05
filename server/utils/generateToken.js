const jwt = require('jsonwebtoken')

const generateToken = (id, exp) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: exp || '30d',
  })

module.exports = generateToken