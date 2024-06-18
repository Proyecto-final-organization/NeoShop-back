const { product, category, store, brand } = require("../../db.js");

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
    throw new Error("the product was not found on the database");
  }

  // Formatear los datos
  const formattedProduct = {
    ...productSearch.toJSON(),
    categories: productSearch.categories.map(cat => cat.name),
    brand: productSearch.brand.name,
    store: productSearch.store.name,
  };

  return formattedProduct;
};

module.exports = getProductById;
