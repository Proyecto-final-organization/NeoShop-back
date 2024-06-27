require("dotenv").config();
const port = process.env.PORT || 3001;
const { httpServer } = require("./src/app.js");
const sendReminderCart = require("./src/controllers/cartControllers/sendReminderCart.js");
const { conn } = require("./src/db.js");
const montarUsers = require("./src/utils/montarUsers.js");

// Configurar la ejecución cada 2 minutos (2 * 60 * 1000 milisegundos) para pruebas
setInterval(sendReminderCart, 60 * 60 * 1000); 

conn
  .sync({ alter: true }) // Cambiar a force para trabajar localmente, alter el otro
  .then(() => {
    httpServer.listen(port, async () => {
      console.log(`Server listening on port ${port}`);
      //await montarUsers();
    });
  })
  .catch((error) => console.error("Database connection error:", error));

