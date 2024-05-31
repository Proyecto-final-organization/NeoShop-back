const { Router } = require("express");
const loginRoutes = Router();
const login = require("../controllers/loginControllers/login");

loginRoutes.post("/", async (req,res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const access = await login(email, password);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = loginRoutes;