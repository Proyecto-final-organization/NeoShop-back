const postProduct = require("../controllers/productControllers/postProduct");
const datosProduct = require("./datosProduct");
const datosStore = require("./datosStore");

module.exports = () => {
  datosStore.forEach((stor) => {
    postProduct(stor);
  });
  datosProduct.forEach((prod) => {
    postProduct(prod);
  });
  console.log("Datos de la API externa guardados en la base de datos.");
};
