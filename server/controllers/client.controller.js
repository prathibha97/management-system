const Client = require('../models/Client');

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occured while fetching client data' });
  }
};

const createClient = async (req, res) => {
  const { first, last, email, phone, street, city, state, zip } = req.body;
  try {
    const client = await Client.create({
      name: { first, last },
      email,
      phone,
      address: { street, city, state, zip },
    });
    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occured while creating client' });
  }
};

const getClientProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById({ _id: id });
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error occured while fetching client profile' });
  }
};

const removeClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById({ _id: id });
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
    }
    client.delete();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error occured while removing client profile' });
  }
};

const editClient = async (req, res) => {
  const { id } = req.params;
  const { first, last, email, phone, street, city, state, zip } = req.body;
  console.log(req.body);
  try {
    const client = await Client.findById({ _id: id });
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
    }
    client.name.first = first || client.name.first;
    client.name.last = last || client.name.last;
    client.email = email || client.email;
    client.phone = phone || client.phone;
    client.address.street = street || client.address.street;
    client.address.city = city || client.address.city;
    client.address.state = state || client.address.state;
    client.address.zip = zip || client.address.zip;
    const updatedClient = await client.save();
    res.status(200).json(updatedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occured while editing client' });
  }
};

module.exports = {
  getAllClients,
  createClient,
  getClientProfile,
  removeClient,
  editClient,
};
