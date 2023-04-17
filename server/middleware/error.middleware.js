const { logEvents } = require("./logEvents");

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalalUrl}`);
  res.status(404);
  next(error);
};


const errorHandler = (err, req, res) => {
  logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;


module.exports = {
  errorHandler,
  notFound
};