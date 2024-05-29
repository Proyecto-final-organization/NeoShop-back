const { product } = require('../../db.js');
const { Sequelize } = require('sequelize');//Sequelize for to search on the database through JS

//Esta funcion busca productos por id
const getProductByName = async (name) => {
    const loweredName = name.toLowerCase();//Volvemos el nombre a minusculas

    const arrayofProductsOnDB = await product.findAll({//Buscamos todos los productos con el nombre dado
        where: { name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), loweredName) }
    });

    if (arrayofProductsOnDB.length < 1) {
        return "No results found";
    }

    return arrayofProductsOnDB;
};

module.exports = getProductByName;