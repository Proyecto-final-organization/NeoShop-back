const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const invalidRoute = require("./middleware/invalidRoute");

const whitelist = [
  "https://neo-shop-front-l7621ntd5-neoshopmarketplace.vercel.app",
  "https://neo-shop-dashboard-loha0llqe-neoshopmarketplace.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

const corsOptions ={
  origin: '*', // Permitir todas las solicitudes
  credentials: true, // Habilita el envío de cookies
};

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(cors(corsOptions));
server.use(router);
server.use(invalidRoute);

module.exports = server;


