require("dotenv").config();
const { Sequelize } = require("sequelize");


//* NOTE: These associations enable bidirectional querying between associated tables.

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
