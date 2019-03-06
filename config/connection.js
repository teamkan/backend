const development = {
  database: 'teamban',
  username: 'teamban',
  password: 'TeamBan',
  host: 'kanduti.com',
  dialect: 'mysql',
};

const testing = {
  database: 'teamban',
  username: 'teamban',
  password: 'TeamBan',
  host: 'kanduti.com',
  dialect: 'mysql',
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
};

module.exports = {
  development,
  testing,
  production,
};
