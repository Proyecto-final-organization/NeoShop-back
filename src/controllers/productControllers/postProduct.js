const { product, category, store, brand } = require("../../db.js");

const postProduct = async ({
  name,
  description,
  price,
  quantity,
  img_product,
  categoryName,
  fromStore,
  brand: brandName,
}) => {
  const existingStore = await store.findOne({
    where: {
      name: fromStore,
    },
  });

  if (!existingStore) {
    throw new Error("Store not found");
  }
  const [newBrand] = await brand.findOrCreate({
    where: {
      name: brandName,
    },
  });

  const createNewProduct = await product.create({
    name,
    description,
    price,
    quantity,
    img_product,
    brandIdBrand: newBrand.id_brand,
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
  await createNewProduct.setStore(existingStore);

  return {
    message: "Product saved successfully",
    product: createNewProduct.get(),
    categories: newCategorys.map((cat) => cat.get()),
    store: existingStore.get(),
    brand: newBrand.get(),
  };
};

module.exports = postProduct;