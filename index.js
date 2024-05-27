require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn
  .sync({ force: true })
  .then(() => {
    server.listen(port, async () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) =>
    console.error("Database connection error:", error)
  );
