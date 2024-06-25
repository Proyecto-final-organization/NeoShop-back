const { Router } = require("express");
const saveProductsOnCart = require("../controllers/cartControllers/saveProductsOnCart");
const getAllCarts = require("../controllers/cartControllers/getAllCarts");
const cartByUserId = require("../controllers/cartControllers/cartByUserId");
const deleteProductCart = require("../controllers/cartControllers/deleteProductsCart");
const cartRoutes = Router();

// Esta función crea o actualiza la información del carrito de cada usuario
cartRoutes.post("/", async (req, res) => {
  try {
    const { idUser, arrayProducts } = req.body;

    if (!idUser) {
      return res.status(400).json({ error: "The user can not be empty" });
    }
    if (!arrayProducts) {
      return res.status(400).json({ error: "Missing data" });
    }
    if (!Array.isArray(arrayProducts)) {
      return res.status(400).json({ error: "The product ids must be an array" });
    }

    const uuidPattern = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    if (!uuidPattern.test(idUser)) {
      return res.status(400).json({ error: "The user id must be a valid UUID." });
    }

    const message = await saveProductsOnCart({ idUser, arrayProducts, io: req.io });
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Esta función trae todos los carritos
cartRoutes.get("/all", async (req, res) => {
  try {
    const message = await getAllCarts();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Este es para traer un cart por id del usuario
cartRoutes.get("/id/:idUsuario", async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (typeof idUsuario !== "string") {
      return res.status(400).json("idUsuario must be a string");
    }
    const userCart = await cartByUserId(idUsuario);
    return res.status(200).json(userCart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un producto del carrito de un usuario
cartRoutes.delete("/deleteItem", async (req, res) => {
  try {
    const { idUser, idProduct } = req.body;
    if (!idUser || !idProduct) {
      return res.status(400).json({ error: "Missing data" });
    }
    // Validar que idProduct sea un UUID válido
    const uuidPattern =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    if (!uuidPattern.test(idProduct)) {
      return res
        .status(400)
        .json({ error: "The product id must be a valid UUID." });
    }
    const deletedProductMessage = await deleteProductCart({
      idUser,
      idProduct,
    });

    // Emitir evento de actualización de carrito
    const io = req.app.get('io');
    io.emit(`cart_updated_${idUser}`, deletedProductMessage);

    res.status(200).json(deletedProductMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = cartRoutes;

