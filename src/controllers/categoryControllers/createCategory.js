const { category } = require("../../db.js");

async function createCategory(data) {
  const { name } = data;

  if (!name) {
    throw new Error("Missing data");
  }

  // Verificar si ya existe una marca con el mismo nombre y dirección
  const existingCateory = await category.findOne({
    where: {
      name,
    },
  });

  if (existingCateory) {
    throw new Error("The store name is already in use");
  }

  const newCateory = await category.create({ name:name,});

  return { message: "Cateory saved successfully", Cateory: newCateory };
}

module.exports = createCategory;
