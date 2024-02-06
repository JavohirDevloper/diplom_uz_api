const express = require("express");
const categoryController = require("../controllers/category.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const router = express.Router();

router.post("/category", isLoggedIn, categoryController.createCategory);
router.get("/category", isLoggedIn, categoryController.getCategories);
router.get("/category/:id", isLoggedIn, categoryController.getCategoryById);
router.put("/category/:id", isLoggedIn, categoryController.updateCategory);
router.delete("/category/:id", isLoggedIn, categoryController.deleteCategory);

module.exports = router;
