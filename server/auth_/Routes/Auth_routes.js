const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refreshToken,
  logout,
  userData,
  accessToken,
} = require("../Controllers/Auth.Controller");
const {verifyRefreshToken, verifyAccessToken } = require("../helpers/jwt_helper");
router.get('/user/:id',verifyAccessToken,userData)
router.post("/register", register);

router.post("/login", login);

router.post("/refresh-token/:id", refreshToken);
// router.get("/access-token",verifyAccessToken, accessToken)
router.delete("/logout", logout);

module.exports = router;
