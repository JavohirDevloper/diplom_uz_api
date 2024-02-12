const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller.js");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const { upload } = require("../shared/config/multer.config");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10, 
  message: "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

router.post("/files", isLoggedIn,limiter, upload.single("file"),fileController.createFile);
router.get("/:id", isLoggedIn, limiter, fileController.getFileByID);
router.put("/:id", isLoggedIn,limiter, fileController.updateFile);
router.delete("/:id",isLoggedIn,limiter,  fileController.deleteFile);

module.exports = router;
