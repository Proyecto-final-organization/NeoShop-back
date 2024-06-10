const { Router } = require("express");
const saveProductsOnCart = require("../controllers/cartControllers/saveProductsOnCart");
const getAllCarts = require("../controllers/cartControllers/getAllCarts");
const cartByUserId = require("../controllers/cartControllers/cartByUserId");
const cartRoutes = Router();

//Esta funcion crea o actualiza la informacion del carrito de cada usuario
cartRoutes.post("/", async (req, res) => {
  try {
    const { idUser, arrayProducts } = req.body;

    if (!idUser) {
      return res.status(400).json({ error: "The user can not be empty" });
    }
    if (!arrayProducts) {
      return res
        .status(400)
        .json({ error: "The array of products can not be empty" });
    }
    if (!Array.isArray(arrayProducts)) {
      return res.status(400).json({ error: "The product ids must be an array" });
    }
    if (arrayProducts.length === 0) {
      return res.status(400).json({ error: "The array of products can not be empty" });
    }

    // Validar que idUser sea un UUID válido
    const uuidPattern =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    if (!uuidPattern.test(idUser)) {
      return res
        .status(400)
        .json({ error: "The user id must be a valid UUID." });
    }

    // Validar que los IDs de los productos sean UUIDs válidos
    for (const productId of arrayProducts) {
      if (!uuidPattern.test(productId)) {
        return res
          .status(400)
          .json({ error: `The product id must be a valid UUID.` });
      }
    }

    const message = await saveProductsOnCart({ idUser, arrayProducts });
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Esta funcion trae todos los carritos
cartRoutes.get("/all", async (req, res) => {
  try {
    const message = await getAllCarts();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Este es para traer un cart por id del usuario
cartRoutes.get("/id/:idUsuario", async (req, res) => {
  try {
    const { idUsuario } = req.params;

    // Validar que idStore sea un UUID válido
    const uuidPattern =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    if (!uuidPattern.test(idUsuario)) {
      return res
        .status(400)
        .json({ error: "Invalid parameter. It must be a valid UUID." });
    }
    const userCart = await cartByUserId(idUsuario);
    return res.status(200).json(userCart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = cartRoutes;
