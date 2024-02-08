const express = require("express");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const FriendController = require("../controllers/friends.controller.js");

const router = express.Router();

router.get("/friend", isLoggedIn, FriendController.getAllFriend);
router.get("/friend/:id", isLoggedIn, FriendController.getFriendById);
router.post("/friend", isLoggedIn, FriendController.createFriend);
router.put("/friend/:id", isLoggedIn, FriendController.updatedFriend);
router.delete("/friend/:id", isLoggedIn, FriendController.deleteFreind);

module.exports = router;
