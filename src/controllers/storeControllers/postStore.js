const { store, user } = require("../../db.js");

async function postStore(data) {
  const { address_cp, address_country, address_city, name, logo, id_user } = data;

  if (!address_cp || !address_country || !address_city || !name) {
    throw new Error("Missing data");
  }

  //Buscamos el usuario
  const theUser = await user.findByPk(id_user);
  if (!theUser) {
    throw new Error("User not found");
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

  await theUser.addStore(createNewStore);

  return { message: "Store saved successfully", store: createNewStore };
}

module.exports = postStore;
