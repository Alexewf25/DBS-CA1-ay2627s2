const productModel = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productModel.getProductWithReviews(id);
    if (!data.product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.json({ success: true, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { getAllProducts, getProductById };