const express = require("express");
const PositionController = require("../controllers/position.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10, 
  message: "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});
router.post("/position", isLoggedIn,limiter, PositionController.createPosition);
router.get("/position/:id", isLoggedIn,limiter, PositionController.getPositionById);
router.put("/position/:id", isLoggedIn, limiter,PositionController.updatePositionById);
router.delete("/position/:id",isLoggedIn,limiter, PositionController.deletePositionById);

module.exports = router;
