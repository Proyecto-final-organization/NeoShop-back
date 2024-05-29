const { product } = require('../../db.js');
const { Sequelize } = require('sequelize');

//This function get all the products from our DB
async function getProducts(req, res) {
        const productsFromDB = await product.findAll();//Traemos todos los productos de la base de datos

        if (productsFromDB.length === 0) {//comprobamos que no este vacia
            throw new Error("No products found in the database.");
        }

        const arrOfProducts = productsFromDB.map(x => {//Los retornamos con los siguientes datos:
            return {
                id_product:  x.id_product,
                img_product: x.img_product,
                name: x.name,
                description: x.description,
                date_creation: x.date_creation,
                price: x.price,
                quantity: x.quantity,
                available: x.available,
                average_mark: x.average_mark,
            };
        });
        
        return(arrOfProducts)
}

module.exports = getProducts;