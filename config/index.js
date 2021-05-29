require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.NODE_ENV === 'test' ? process.env.MONGO_DB_URI_TEST : process.env.MONGO_DB_URI,
  secret: process.env.SECRET,
};

