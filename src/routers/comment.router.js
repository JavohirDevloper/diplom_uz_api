const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");


router.post("/comment",isLoggedIn,  commentController.createComment);
router.get("/comment/:id",isLoggedIn, commentController.getComment);
router.put("/comment/:id",isLoggedIn, commentController.updateCommentById);
router.delete("/comment/:id",isLoggedIn, commentController.deleteCommentById);

module.exports = router;
