require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const montarUsers = require("./src/utils/montarUsers.js");

conn
  .sync({ force: true })//cambiar a force para trabajar localmente, alter el otro
  .then(async () => {
    server.listen(port, async () => {
      console.log(`Server listening on port ${port}`);
    });
    await montarUsers();
    console.log("Recordar montar primeros las stores y luego los products");
    console.log("Para stores: POST http://localhost:3001/fakesStores");
    console.log("Para products: POST http://localhost:3001/");
  })
  .catch((error) =>
    console.error("Database connection error:", error)
  );