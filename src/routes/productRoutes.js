const { Router } = require("express");
const productRoutes = Router();
const getProducts = require("../controllers/productControllers/getProducts");
//* Estas son las rutas para los productos 
//validators

//controllers
productRoutes.get("/", async (req, res) => {//aqui siempre '/'
    try {
      const products = await getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

module.exports = productRoutes;
