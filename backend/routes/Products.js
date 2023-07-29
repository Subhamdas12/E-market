const express = require("express");
const { createProduct, fetchAllProducts } = require("../controllers/Product");
const router = express.Router();
router.post("/", createProduct).get("/", fetchAllProducts);
exports.router = router;
