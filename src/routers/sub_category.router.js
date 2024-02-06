const express = require("express");
const sub_categoryController = require("../controllers/sub_category.controller.js");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const router = express.Router();

router.post("/sub_category", isLoggedIn, sub_categoryController.createSubCategory);
router.get("/sub_category", isLoggedIn, sub_categoryController.getSubCategories);
router.get("/sub_category/:id", isLoggedIn, sub_categoryController.getSubCategoryById);
router.put("/sub_category/:id", isLoggedIn, sub_categoryController.updateSubCategory);
router.delete("/sub_category/:id", isLoggedIn, sub_categoryController.deleteSubCategory);

module.exports = router;
