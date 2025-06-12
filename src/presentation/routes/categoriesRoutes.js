const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();

router.get("/", CategoryController.listCategories);
router.post("/", CategoryController.createCategory);
router.get("/:id", CategoryController.getCategory);

module.exports = router; 