const { Router } = require("express");
const getAllBrands = require("../controllers/brandControllers/getAllBrands");
const brandRoutes = Router();

brandRoutes.get("/", async (req, res) => {
  try {
    const brandAll = await getAllBrands();
    res.status(200).json(brandAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = brandRoutes;