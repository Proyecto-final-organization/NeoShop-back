require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASS, DB_HOST, DB_PORT,DB_NAME } = process.env;
const userModel = require("./models/User");
const productModel = require("./models/Product");
const orderModel = require("./models/Order");
const order_detailModel = require("./models/OrderDetail");
const paymentModel = require("./models/Payment");
const reviewModel = require("./models/Review");
const categoryModel = require("./models/Category");
const cartModel = require("./models/Cart");
const discountsModel = require("./models/Discounts");
const storeModel = require("./models/Store");
const brandModel = require("./models/Brand");

//Configuración de la base de forma local, recuerden crear en postgress la base de datos neoshop.
//Configuración de la base de forma local, recuerden crear en postgress la base de datos neoshop.
const sequelize = new Sequelize(DB_DEPLOY, {
  dialect: "postgres",
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Usar false si no tienes un certificado de CA válido
    },
  },
});

//modelos de la base de datos
userModel(sequelize);
productModel(sequelize);
orderModel(sequelize);
order_detailModel(sequelize);
paymentModel(sequelize);
reviewModel(sequelize);
categoryModel(sequelize);
cartModel(sequelize);
discountsModel(sequelize);
storeModel(sequelize);
brandModel(sequelize);
//Relaciones
const {
  product,
  order,
  store,
  order_detail,
  payment,
  review,
  user,
  discounts,
  cart,
  category,
  brand,
} = sequelize.models;

//Relacion de user a product de muchos a muchos, va servir para guardar favoritos del user
user.belongsToMany(product, { through: "user_product" });
product.belongsToMany(user, { through: "user_product" });

//Relacion de muchos a muchos de user a store
store.belongsToMany(user, { through: "store_user" });
user.belongsToMany(store, { through: "store_user" });

//Relación de 1 a muchos de usuario a order
user.hasMany(order);
order.belongsTo(user);

// Relación de User a Cart (1 a 1){foreignKey es porque el nombre con el que guardaba era incorrecto}
user.hasOne(cart, { foreignKey: 'id_user' });
cart.belongsTo(user, { foreignKey: 'id_user' });

// Relación de product a Review (1 a muchos)
product.hasMany(review);
review.belongsTo(product);

//relacion de store a producto de 1 a muchos
store.hasMany(product);
product.belongsTo(store);

//marca a producto de 1 a muchos
brand.hasMany(product);
product.belongsTo(brand);

// Relación de Cart a product (muchos a muchos)
cart.belongsToMany(product, { through: "cart_product" });
product.belongsToMany(cart, { through: "cart_product" });

// Relación de category a product (muchos a muchos)
category.belongsToMany(product, { through: "category_product" });
product.belongsToMany(category, { through: "category_product" });

// Relación de Discounts a product (uno a uno)
discounts.hasOne(product);
product.belongsTo(discounts);

// Relación de Order a Payment (1 a 1)
order.hasOne(payment);
payment.belongsTo(order);

// Relacion de order a order_item de 1 a muchos
order.hasMany(order_detail);
order_detail.belongsTo(order);

module.exports = {
  //...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  product,
  order,
  store,
  order_detail,
  payment,
  review,
  user,
  discounts,
  cart,
  category,
  brand,
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
