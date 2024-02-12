const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10, 
  message: "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

router.post("/comment",isLoggedIn, limiter, commentController.createComment);
router.get("/comment",isLoggedIn,limiter, commentController.getComment);
router.put("/comment/:id",isLoggedIn,limiter, commentController.updateCommentById);
router.delete("/comment/:id",isLoggedIn,limiter, commentController.deleteCommentById);

module.exports = router;
