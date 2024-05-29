const { Product } = require("./src/db.js");
// const { Sequelize } = require('sequelize');

async function postProduct(req, res) {
    const {
        name,
        description,
        date,
        price,
        quantity,
        available,
        average_mark,
        status,
        id_review,
        id_discounts,
        id_store,
    } = req.body;
    try {
        if (!name || !description || !date || !price || !quantity || !available || !average_mark || !status || !id_review || !id_discounts || !id_store) {
            return res.status(402).send({ message: 'Missing data' });
        }
        const createNewProduct = await Product.create({
            name, description, date, price, quantity, available, average_mark, status, id_review, id_discounts, id_store
        });

        return res.status(201).json({ message: "Data saved successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = postProduct;