const express = require("express");
const sub_categoryController = require("../controllers/sub_category.controller.js");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10, 
  message: "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

router.post("/sub_category", isLoggedIn,limiter, sub_categoryController.createSubCategory);
router.get("/sub_category", isLoggedIn, limiter, sub_categoryController.getSubCategories);
router.get("/sub_category/:id", isLoggedIn,limiter, sub_categoryController.getSubCategoryById);
router.put("/sub_category/:id", isLoggedIn,limiter, sub_categoryController.updateSubCategory);
router.delete("/sub_category/:id", isLoggedIn,limiter, sub_categoryController.deleteSubCategory);

module.exports = router;
