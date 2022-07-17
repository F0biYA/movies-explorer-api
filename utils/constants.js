require('dotenv').config();

// прописать порт и адресс базы
const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/newExplorerMoviesdb',
} = process.env;

module.exports = {
  PORT,
  MONGO_URL,
};
