const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
require("./auth_/helpers/init_mongodb");
const cors = require("cors");
const AuthRoute = require("./auth_/Routes/Auth_routes");
const productRoutes = require("./products/Routes/Product.Routes")
const { verifyAccessToken } = require("./auth_/helpers/jwt_helper");
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}
const app = express();
const allowedOrigins = ["http://localhost:3000", "https://collegesuvidha.vercel.app","https://collegesuvidha.onrender.com"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res, next) => {
  // console.log("home page");
  res.send("Test Api working properly!!");
});
app.use("/auth", AuthRoute);

app.use("/products", productRoutes);

app.use(async (req, res, next) => {
  // const error = new Error ("Not Found");
  // error.status = 404;
  // next(error);
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});


process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Restart the server
  process.exit(1); // 1 indicates an abnormal exit, which will trigger the nodemon to restart
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

