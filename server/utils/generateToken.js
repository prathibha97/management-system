const jwt = require('jsonwebtoken')

const generateToken = (id, exp, secret) =>
  jwt.sign({ id }, secret, {
    expiresIn: exp || '30d',
  });

module.exports = generateToken