require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
// const userModel = require("./models/User");
// const productModel = require("./models/Book");
// const orderModel = require("./models/Order");
// const order_detailModel = require("./models/Order_detail");
// const paymentModel = require("./models/Payment");
// const reviewModel = require("./models/Review");
// const categoryModel = require("./models/Category");
// const cartModel = require("./models/Cart");
// const discountsModel = require("./models/Discounts");
// const editorialModel = require("./models/Editorial");
// const languageModel = require("./models/Language");

//Configuración de la base de forma local, recuerden crear en postgress la base de datos neoshop.
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/neoshop`,
  {
    logging: false,
    native: false,
  }
);
//modelos de la base de datos



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
