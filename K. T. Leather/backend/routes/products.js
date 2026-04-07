const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.getProducts);
router.post("/", authMiddleware, productController.createProduct);
router.get("/:id", authMiddleware, productController.getProductById);
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
