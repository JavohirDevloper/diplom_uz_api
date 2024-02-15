const express = require("express");
const router = express.Router();
const {
  createFile,
  getFileByID,
  updateFile,
  deleteFile,
} = require("../controllers/file.controller.js");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10,
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

router.post("/videos", isLoggedIn, limiter, createFile);
router.get("/videos/:id", isLoggedIn, limiter, getFileByID);
router.put("/videos/:id", isLoggedIn, limiter, updateFile);
router.delete("/videos/:id", isLoggedIn, limiter, deleteFile);

module.exports = router;
