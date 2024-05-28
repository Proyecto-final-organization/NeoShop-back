const { Product } = require('../../db.js');

//This function get all the products from our DB
async function getProducts(req, res) {
    try {
        const productsFromDB = await Product.findAll({});
        const arrOfProducts = productsFromDB.map(x => {
            return {
                name: x.name,
                description: x.description,
                date: x.date,
                price: x.price,
                quantity: x.quantity,
                avalible: x.avalible,
                average_mark: x.average_mark,
                status: x.status,
                id_review: x.review,
                id_discounts: x.id_discounts,
                id_store: x.id_store
            };
        });
        res.status(200).send(arrOfProducts);

    } catch (error) {
        console.log("Error on getProducts");
        res.status(500).send({ message: error.message });
    }
}

module.exports = getProducts;