const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "store",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      address_cp: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          len: [1, 5],
          is: /^[0-9]+$/, // Valida que solo contenga números
        },
      },
      address_country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20],
            isAlpha: true, // Valida que solo contenga letras
        },
      },
      address_city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20],
            isAlpha: true, // Valida que solo contenga letras
        },
      },
      date_creation: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true, // Valida que sea una fecha válida
        },
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true // Valida que sea una URL válida
        }
      }
    },
    { timestamps: false }
  );
};
