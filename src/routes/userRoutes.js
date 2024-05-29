const { Router } = require("express");
const userRoutes = Router();
const postUser = require("../controllers/userControllers/postUser");
const getUser = require("../controllers/userControllers/getUser");
const getUserById = require("../controllers/userControllers/getUserById");

userRoutes.post("/", async (req, res) => {
  try {
    const {name, lastname, password, city, state, postalCode, email} = req.body;
    const newUser = await postUser({name, lastname, password, city, state, postalCode, email});
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

userRoutes.get("/", async (req, res) => {
    try {
        const allUsers = await getUser();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

userRoutes.get("/:idUser", async (req, res) => {
    try {
        const {idUser} = req.params;
        const userData = await getUserById(idUser);
        return res.status(200).json(userData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = userRoutes;
