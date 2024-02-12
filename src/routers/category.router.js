const express = require("express");
const categoryController = require("../controllers/category.controller");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const isLoggedIn = require("../shared/auth/isLoggedIn");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10,
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

router.post(
  "/category",
  isLoggedIn,
  limiter,
  categoryController.createCategory
);
router.put(
  "/category/:id",
  isLoggedIn,
  limiter,
  categoryController.updateCategory
);
router.delete(
  "/category/:id",
  isLoggedIn,
  limiter,
  categoryController.deleteCategory
);

router.get("/category", isLoggedIn, limiter, categoryController.getCategories);
router.get(
  "/category/:id",
  isLoggedIn,
  limiter,
  categoryController.getCategoryById
);

module.exports = router;
