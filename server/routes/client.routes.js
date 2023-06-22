const express = require('express');
const { protect, admin } = require('../middleware/auth.middleware');
const {
  getAllClients,
  createClient,
  getClientProfile,
  removeClient,
  editClient,
} = require('../controllers/client.controller');

const clientRouter = express.Router();

clientRouter.get('/', protect, getAllClients).post('/', protect, admin, createClient);
clientRouter
  .get('/:id', protect, admin, getClientProfile)
  .put('/:id', protect, admin, editClient)
  .delete('/:id', protect, admin, removeClient);

module.exports = clientRouter;
