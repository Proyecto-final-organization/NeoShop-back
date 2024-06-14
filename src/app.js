const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const invalidRoute = require("./middleware/invalidRoute");
const corsOptions = {
  origin: [
    "https://neo-shop-front.vercel.app",
    "https://neo-shop-dashboard-ngyjmqsrx-neoshopmarketplace.vercel.app"
  ],
  credentials: true // Habilita el envío de cookies
};

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(cors(corsOptions));
server.use(router);
server.use(invalidRoute);

module.exports = server;
