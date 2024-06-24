const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const invalidRoute = require("./middleware/invalidRoute");
<<<<<<< HEAD
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // Habilita el envío de cookies
};
=======
>>>>>>> 355fa14d531832cf55d621b05636060205188d33

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
<<<<<<< HEAD
server.use(cors({corsOptions}));
=======
server.use(
    cors({
      origin: ["https://neo-shop-front.vercel.app", "https://neo-shop-dashboard-ngyjmqsrx-neoshopmarketplace.vercel.app", "http://localhost:5173", "http://localhost:3000"], // Cambia esto al dominio de tu frontend
      credentials: true, // Habilita el envío de cookies
    })
  );
>>>>>>> 355fa14d531832cf55d621b05636060205188d33
server.use(router);
server.use(invalidRoute);

module.exports = server;
