const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
require("./auth_/helpers/init_mongodb");
const cors = require('cors');
const AuthRoute = require("./auth_/Routes/Auth_routes");
const { verifyAccessToken } = require("./auth_/helpers/jwt_helper");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", verifyAccessToken, async (req, res, next) => {
  console.log("home page");
  res.send("home page");
});
app.use("/auth", AuthRoute);

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
