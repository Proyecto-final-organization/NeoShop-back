// models/Cart.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cart",
    {
      id_cart: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
    },
    { timestamps: false }
  );
};
