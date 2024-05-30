const { product, category, store, brand } = require("../../db.js");

//Esta funcion busca productos por id
const getProductById = async (idProduct) => {
  const productSearch = await product.findByPk(idProduct, {
    include: [
      {
        model: category,
        through: { attributes: [] },
        attributes: ["name"],
      },
      {
        model: store,
        attributes: ["name"],
      },
      {
        model: brand,
        attributes: ["name"],
      },
    ],
  });

  if (productSearch === null) {
    //comprobamos que exista el producto
    throw new Error("the product was not found on the database");
  }

  return productSearch;
};

module.exports = getProductById;
