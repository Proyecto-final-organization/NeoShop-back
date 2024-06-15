const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const invalidRoute = require("./middleware/invalidRoute");

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(
    cors({
      origin: ["https://neo-shop-front.vercel.app", "https://neo-shop-dashboard-ngyjmqsrx-neoshopmarketplace.vercel.app", "http://localhost:5173", "http://localhost:3000"], // Cambia esto al dominio de tu frontend
      credentials: true, // Habilita el envío de cookies
    })
  );
server.use(router);
server.use(invalidRoute);

module.exports = server;
