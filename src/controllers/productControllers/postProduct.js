const { product, category, store } = require("../../db.js");

async function postProduct(data) {
  const {
    name,
    description,
    price,
    quantity,
    img_product,
    categoryName,
    fromStore,
  } = data;

  if (
    !name &&
    !description &&
    !price &&
    !quantity &&
    !img_product &&
    !categoryName &&
    !fromStore
  ) {
    throw new Error("Missing data");
  }

  const createNewProduct = await product.create({
    name,
    description,
    price,
    quantity,
    img_product,
  });

  const newCategorys = await Promise.all(
    categoryName.map(async (n) => {
      const [newCategory] = await category.findOrCreate({
        where: {
          name: n,
        },
      });
      return newCategory;
    })
  );
  await createNewProduct.setCategories(newCategorys);
  await createNewProduct.setStore(fromStore);

  return {
    message: "Product saved successfully",
    product: createNewProduct.get(),
    categories: newCategorys.map((cat) => cat.get()),
    store: newStore.get(),
  };
}

module.exports = postProduct;
