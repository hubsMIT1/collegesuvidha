const express = require("express");
const router = express.Router();
const upload = require('../Helpers/fileUpload')
// const multer = require('multer');
// const storage = multer.memoryStorage();
// const productImages = multer({ storage: storage });

const productController = require("../Controllers/Product.Controller");

const {
    register,
    login,
    refreshToken,
    logout,
    userData,
    accessToken,
  } = require("../../auth_/Controllers/Auth.Controller");
const {verifyRefreshToken, verifyAccessToken } = require("../../auth_/helpers/jwt_helper");

router.get("/search",productController.searchProducts)
router.post("/",verifyAccessToken, upload.array('imagess'),productController.createProduct)
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductsById);
router.get("/seller-product/:userId", productController.getProductsByUserId);
router.put("/:id", verifyAccessToken, productController.updateProduct);
router.delete("/:id", verifyAccessToken, productController.deleteProduct);
module.exports = router;
