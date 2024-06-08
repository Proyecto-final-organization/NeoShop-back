const { Router } = require("express");
const router = Router();
// Importar todos los routers;
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const storeRoutes = require("./storeRoutes");
const loginRoutes = require("./loginRoutes");
const fakeApi = require("../utils/montarBaseDeDatos");
const categoryRoutes = require("./categoryRoutes");
const brandRoutes = require("./brandRoutes");
const imagesRoutes = require("./imagesRoutes");
const cartRoutes = require("./cartRoutes");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/product", productRoutes);
router.use("/user", userRoutes);
router.use("/store", storeRoutes);
router.use("/login", loginRoutes);
router.use("/category", categoryRoutes);
router.use("/brand", brandRoutes);
router.use("/images", imagesRoutes);
router.use("/fake", fakeApi);
router.use("/cart", cartRoutes);

module.exports = router;
