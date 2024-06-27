require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const montarUsers = require("./src/utils/montarUsers.js");

conn
  .sync({ alter: true })//cambiar a force para trabajar localmente, alter el otro
  .then(() => {
    server.listen(port, async () => {
      console.log(`Server listening on port ${port}`);
    });
    //await montarUsers();
  })
  .catch((error) =>
    console.error("Database connection error:", error)
  );

