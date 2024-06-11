require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const montarStores = require("./src/utils/montarStores.js");

conn
  .sync({ force: true })//cambiar a force para trabajar localmente, alter el otro
  .then(() => {
    server.listen(port, async () => {
      montarStores()
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) =>
    console.error("Database connection error:", error)
  );