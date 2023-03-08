/* eslint-disable camelcase */
const Pusher = require('pusher');

const pusherAuth = (req, res) => {
  // Initialize Pusher client
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
  });

  // Extract socket ID and channel name from request body
  const { socket_id, channel_name } = req.body;

  try {
    // Authenticate the user with Pusher
    if (!socket_id || !channel_name) {
     return res.status(400).send('Socket ID and channel name are required');
    }

    const auth = pusher.authorizeChannel(socket_id, channel_name);
    // Send the authentication information back to the client
    return res.send(auth);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Authentication error');
  }
};

module.exports = {
  pusherAuth,
};
