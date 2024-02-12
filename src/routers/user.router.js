const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10, 
  message: "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

// user authentication
router.post("/user/register",limiter, UserController.registerAndLoginUser);
router.post("/user/verify",limiter, UserController.userLogin);
router.get("/user/code/:code",limiter, UserController.getTokenByCode);

// userlar uchun router
router.get("/user/:id", isLoggedIn,limiter, UserController.getUserById);
router.put("/user/:id", isLoggedIn,limiter, UserController.updateUser);
router.delete("/user/:id", isLoggedIn,limiter, UserController.deleteUser);

module.exports = router;
