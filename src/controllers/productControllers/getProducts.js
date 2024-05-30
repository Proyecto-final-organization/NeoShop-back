const { product, category, store } = require("../../db.js");

//This function get all the products from our DB
async function getProducts(req, res) {
  const productsFromDB = await product.findAll({
    include: [
      { model: category, through: "category_product" },
      { model: store },
    ],
  });

  if (productsFromDB.length === 0) {
    //comprobamos que no este vacia
    throw new Error("No products found in the database.");
  }
  return productsFromDB;
}

module.exports = getProducts;
