const Client = require("../models/Client");

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occured while fetching client data' });
  }
}

const createClient = async (req, res) => {
  const { name, email, phone, street, city, state, zip } = req.body;
  try {
    const client = await Client.create({
      name,
      email,
      phone,
      address: { street, city, state, zip },
    });
    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occured while creating client' });
  }
}

module.exports = {
  getAllClients,
  createClient,
};