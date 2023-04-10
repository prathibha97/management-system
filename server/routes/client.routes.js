const express = require('express');
const { protect, admin } = require('../middleware/auth.middleware');
const { getAllClients, createClient } = require('../controllers/client.controller');

const clientRouter = express.Router();

clientRouter.get('/', protect, admin, getAllClients).post('/', protect, admin, createClient);

module.exports = clientRouter;
