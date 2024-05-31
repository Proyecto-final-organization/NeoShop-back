const { Router } = require("express");
const productRoutes = Router();
//controllers
const getProducts = require("../controllers/productControllers/getProducts");
const getProductById = require("../controllers/productControllers/getProductById");
const postProduct = require("../controllers/productControllers/postProduct");
const getProductByName = require("../controllers/productControllers/getproductByName");

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
      
      // Validar que idStore sea un UUID válido
      const uuidPattern = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
      if (!uuidPattern.test(idProduct)) {
          return res.status(400).json({ error: "Invalid parameter. It must be a valid UUID." });
      }
      const productData = await getProductById(idProduct);
      return res.status(200).json(productData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Este es para poster productos
productRoutes.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      img_product,
      categoryName,
      fromStore,
      brand,
    } = req.body;
    // Verificar que todos los campos estén presentes
    if (!categoryName) {
      return res.status(400).json({ error: "Missing data: categoryName" });
    }
    if (!fromStore) {
      return res.status(400).json({ error: "Missing data: fromStore" });
    }
    if (!name) {
      return res.status(400).json({ error: "Missing data: name" });
    }
    if (!description) {
      return res.status(400).json({ error: "Missing data: description" });
    }
    if (!price) {
      return res.status(400).json({ error: "Missing data: price" });
    }
    if (!quantity) {
      return res.status(400).json({ error: "Missing data: quantity" });
    }
    if (!img_product) {
      return res.status(400).json({ error: "Missing data: img_product" });
    }
    if (!brand) {
      return res.status(400).json({ error: "Missing data: brand" });
    }
    const posted = await postProduct({
      name,
      description,
      price,
      quantity,
      img_product,
      categoryName,
      fromStore,
      brand,
    });
    return res.status(200).json(posted);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Este es para traer productos por nombre
productRoutes.get("/name/:name", async (req, res) => {
  try {
      const {name} = req.params;

      // Verificación de que name es una cadena
      if (typeof name !== 'string') {
        return res.status(400).json({ error: "The 'name' parameter must be a string" });
      }

      // Verificación de que name no sea demasiado largo
      const nameSeparado = name.split('');
      if (nameSeparado.length > 20) {
        return res.status(400).json({ error: "The 'name' parameter is too long" });
      }

      // Verificación de que name no contenga caracteres no permitidos
      const validNamePattern = /^[a-zA-Z0-9\s+]*$/;
      if (!validNamePattern.test(name)) {
        return res.status(400).json({ error: "The 'name' parameter contains invalid characters" });
      }
      //Lo mandamos al controller para que realice la busqueda
      const searchResult = await getProductByName(name);
      return res.status(200).json(searchResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = productRoutes;
