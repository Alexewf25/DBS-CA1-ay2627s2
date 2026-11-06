const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middleware/auth");

router.get("/retrieve/all", verifyToken, productController.getAllProducts);
router.get("/retrieve/:id", verifyToken, productController.getProductById);

module.exports = router;