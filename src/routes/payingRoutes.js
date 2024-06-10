const { Router } = require("express");
const payingRoutes = Router();
const { createOrder } = require("../controllers/payingControllers/createOrder");
const { captureOrder } = require("../controllers/payingControllers/captureOrder");

// Capturar una orden
payingRoutes.post("/capture-order/:orderId", async (req, res) => {
    try {
        const { orderID } = req.body;
        // Realiza las verificaciones necesarias
        if (!orderID) {
            return res.status(400).json({ error: "No se proporcionó el orderID" });
        }
        // Si todas las verificaciones pasan, puedes llamar al controlador
        const response = await captureOrder({ orderID });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una orden
payingRoutes.post("/create-order", async (req, res) => {
    try {
        const { intent, purchase_units } = req.body;
        // Realiza las verificaciones necesarias
        if (!intent || !purchase_units || !Array.isArray(purchase_units) || purchase_units.length === 0) {
            return res.status(400).json({ error: "Datos de orden inválidos" });
        }
        // Si todas las verificaciones pasan, puedes llamar al controlador
        const response = await createOrder({ intent, purchase_units });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = payingRoutes;
