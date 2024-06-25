require("dotenv").config();
const http = require("http");
const port = process.env.PORT || 3001;
const app = require("./src/app.js"); // Renombrado de 'server' a 'app' para mayor claridad
const { conn } = require("./src/db.js");
const montarUsers = require("./src/utils/montarUsers.js");
const { Server } = require("socket.io");

// Crear el servidor HTTP
const server = http.createServer(app);

// Crear la instancia de Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Configura esto según tus necesidades de CORS
    methods: ["GET", "POST"]
  }
});

// Exportar io para usarlo en otros archivos
app.set('io', io);

// Configurar el evento de conexión de Socket.IO
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

conn
  .sync({ force: true }) // Cambiar a force para trabajar localmente, alter el otro
  .then(() => {
    server.listen(port, async () => { // Cambiado de 'app.listen' a 'server.listen'
      console.log(`Server listening on port ${port}`);
      await montarUsers();
    });
  })
  .catch((error) => console.error("Database connection error:", error));
