const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const invalidRoute = require("./middleware/invalidRoute");

const whitelist = [
  "https://neo-shop-front.vercel.app",
  "neo-shop-dashboard-neoshopmarketplace.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir todos los orígenes
    callback(null, true);
  },
  credentials: (origin, callback) => {
    // Habilitar el envío de cookies solo para los orígenes en la lista blanca
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  }
};

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use((req, res, next) => {
  cors(corsOptions)(req, res, next);
});
server.use(router);
server.use(invalidRoute);

module.exports = server;



