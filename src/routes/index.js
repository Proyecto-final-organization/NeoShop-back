//Configuraciónes
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

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/product", productRoutes);
router.use("/user", userRoutes);
router.use("/store", storeRoutes);
router.use("/login", loginRoutes);
router.use("/category", categoryRoutes);
router.use("/brand", brandRoutes);
router.use("/", fakeApi)


module.exports = router;