const { Router } = require("express");
const productRoutes = Router();
const getProducts = require("../controllers/productControllers/getProducts");
const getProductById = require("../controllers/productControllers/getProductById");
const postProduct = require("../controllers/productControllers/postProduct");
const getProductByName = require("../controllers/productControllers/getproductByName");
//validators

//controllers

//Este es para traer todos los productos
productRoutes.get("/", async (req, res) => {
    try {
      const products = await getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//Este es para traer un producto por id
productRoutes.get("/:idProduct", async (req, res) => {
  try {
      const {idProduct} = req.params;
      const productData = await getProductById(idProduct);
      return res.status(200).json(productData);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
});

//Este es para poster productos
productRoutes.post("/", async (req, res) => {
  try {
      const {name,  description, price, quantity, img_product, available} = req.body;
      const posted = await postProduct({name,  description, price, quantity, img_product, available});
      return res.status(200).json(posted);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
});

//Este es para traer productos por nombre
productRoutes.get("/name/:name", async (req, res) => {
  try {
      const {name} = req.params;
      const searchResult = await getProductByName(name);
      return res.status(200).json(searchResult);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
});

module.exports = productRoutes;
