const { Router } = require("express");
const storeRoutes = Router();
const postStore = require("../controllers/storeControllers/postStore");

storeRoutes.post("/", async (req, res) => {
    try {
      const {address_cp, address_country, address_city, name} = req.body;
      const store = await postStore({address_cp, address_country, address_city, name});
      res.status(200).json(store);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

module.exports = storeRoutes;
