const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "discounts",
    {
      id_discounts: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      percentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      date_start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      date_end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
