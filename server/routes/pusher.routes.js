const express = require('express');
const { pusherAuth } = require('../controllers/pusher.controller');

const pusherRouter = express.Router();

pusherRouter.post('/auth', pusherAuth)

module.exports = pusherRouter;