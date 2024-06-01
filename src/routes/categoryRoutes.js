const { Router } = require("express");
const getAllCategory = require("../controllers/categoryControllers/getAllCategory");
const categoryRoutes = Router();

categoryRoutes.get("/", async (req, res) => {
  try {
    const categorysAll = await getAllCategory();
    res.status(200).json(categorysAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = categoryRoutes;
