// routers/fileRouter.js
const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller.js");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const { upload } = require("../shared/config/multer.config");


router.post("/files", isLoggedIn, upload.single("file"),fileController.createFile);
router.get("/:id", isLoggedIn, fileController.getFileByID);
router.put("/:id", isLoggedIn, fileController.updateFile);
router.delete("/:id",isLoggedIn,  fileController.deleteFile);

module.exports = router;
