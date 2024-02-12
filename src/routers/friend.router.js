const express = require("express");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const FriendController = require("../controllers/friends.controller.js");

const router = express.Router();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10, 
  message: "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

router.get("/friend", isLoggedIn,limiter, FriendController.getAllFriend);
router.get("/friend/:id", isLoggedIn,limiter, FriendController.getFriendById);
router.post("/friend", isLoggedIn,limiter, FriendController.createFriend);
router.put("/friend/:id", isLoggedIn,limiter,  FriendController.updatedFriend);
router.delete("/friend/:id", isLoggedIn, limiter, FriendController.deleteFreind);

module.exports = router;
