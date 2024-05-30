const datosStore = require("./datosStore");
const postStore = require("../controllers/storeControllers/postStore");

module.exports = () => {
  datosStore.forEach((stor) => {
    postStore(stor);
  });
  console.log("Datos de la store montados en la BD");
};
