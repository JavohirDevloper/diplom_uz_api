const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");

// user authentication
router.post("/user/register", UserController.registerAndLoginUser);
router.post("/user/verify", UserController.userLogin);
router.get("/user/code/:code", UserController.getTokenByCode);

// userlar uchun router
router.get("/user/:id", isLoggedIn, UserController.getUserById);
router.put("/user/:id", isLoggedIn, UserController.updateUser);
router.delete("/user/:id", isLoggedIn, UserController.deleteUser);

module.exports = router;
