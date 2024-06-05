const { store } = require("../../db.js");

async function postStore(data) {
  const { address_cp, address_country, address_city, name, logo } = data;

  if (!address_cp || !address_country || !address_city || !name) {
    throw new Error("Missing data");
  }

  // Verificar si ya existe una tienda con el mismo nombre y dirección
  const existingStore = await store.findOne({
    where: {
      name,
    },
  });

  if (existingStore) {
    throw new Error("The store name is already in use");
  }

  const createNewStore = await store.create({
    name,
    address_cp,
    address_country,
    address_city,
    logo
  });

  return { message: "Store saved successfully", store: createNewStore };
}

module.exports = postStore;
