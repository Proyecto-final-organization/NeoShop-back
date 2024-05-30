//Configuraciónes
const { Router } = require("express");
const router = Router();
// Importar todos los routers;
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const storeRoutes = require("./storeRoutes");
const fakeApi = require("../utils/montarBaseDeDatos")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/product", productRoutes);
router.use("/user", userRoutes);
router.use("/store", storeRoutes);
router.use("/", fakeApi)


module.exports = router;