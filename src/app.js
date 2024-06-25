const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const invalidRoute = require("./middleware/invalidRoute");
const { createServer } = require("http");
const { Server } = require("socket.io");

const whitelist = ["http://localhost:5173", "http://example2.com"]; // Define tu lista blanca aquí

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Habilita el envío de cookies
};

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(cors(corsOptions));
server.use(router);
server.use(invalidRoute);

const httpServer = createServer(server);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Aquí puedes ajustar el origen según tus necesidades o mantenerlo como "*"
    methods: ["GET", "POST"],
  },
});

// Almacenar `io` en la aplicación de Express
server.set("io", io);

module.exports = { server, httpServer };
