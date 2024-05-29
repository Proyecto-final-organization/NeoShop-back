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
                name: x.name,
                description: x.description,
                date: x.date,
                price: x.price,
                quantity: x.quantity,
                available: x.available,
                average_mark: x.average_mark,
                status: x.status,
                id_review: x.review,
                id_discounts: x.id_discounts,
                id_store: x.id_store
            };
        });
        
        return(arrOfProducts)
}

module.exports = getProducts;