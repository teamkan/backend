const privateRoutes = require('./routes/privateRoutes');
const publicRoutes = require('./routes/publicRoutes');

const config = {
  migrate: true,
  privateRoutes,
  publicRoutes,
  port: 8080,//process.env.PORT || '2017',
};

module.exports = config;
