const { logEvents } = require('./logEvents');

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
    .then(() => {
      console.error(err.stack);
      res.status(err.status || 500).json({ error: err.message });
    })
    .catch((logError) => {
      console.error('Error logging event:', logError);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  next(err);
};

module.exports = {
  notFound,
  errorHandler,
};
