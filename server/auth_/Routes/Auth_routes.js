const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refreshToken,
  logout,
  userData,
  accessToken,
  userSellerData,
} = require("../Controllers/Auth.Controller");
const {verifyRefreshToken, verifyAccessToken } = require("../helpers/jwt_helper");
const { verifyAdmin, addNewAdmin } = require("../admin/Admin");
router.get('/user/:id',verifyAccessToken,userData)
router.get('/seller/:id',userSellerData);
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token/:id", refreshToken);
// router.get("/access-token",verifyAccessToken, accessToken)
router.delete("/logout", logout);

router.post("/add-admin",verifyAccessToken,verifyAdmin,addNewAdmin)
module.exports = router;
