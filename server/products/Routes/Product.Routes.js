const express = require("express");
const router = express.Router();
const upload = require("../Helpers/fileUpload");
const productController = require("../Controllers/Product.Controller");


const {
  verifyRefreshToken,
  verifyAccessToken,
} = require("../../auth_/helpers/jwt_helper");
const { verifyAdmin } = require("../../auth_/admin/Admin");

router.get("/search", productController.searchProducts);
router.post(
  "/",
  verifyAccessToken,
  upload.array("imagess"),
  productController.createProduct
);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductsById);
router.put(
  "/admin/:productId",
  verifyAccessToken,
  verifyAdmin,
  productController.updateProductStatus
);
router.get(
  "/seller-product/:userId",
  verifyAccessToken,
  productController.getProductsByUserId
);
router.put(
  "/:id",
  verifyAccessToken,
  upload.array("imagess"),
  productController.updateProduct
);
router.delete("/delete/:id", verifyAccessToken, productController.deleteProduct);
module.exports = router;
