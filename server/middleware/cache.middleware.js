const setCache = (req, res, next) => {
  const period = 60 * 5;
  if (req.method === 'GET') {
    res.set('Cache-control', `public, max-age=${period}`);
  } else {
    res.set('Cache-controll', 'no-store');
  }
  next();
};

module.exports = setCache;
