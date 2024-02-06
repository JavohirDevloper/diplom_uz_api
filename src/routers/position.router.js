const express = require("express");
const PositionController = require("../controllers/position.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const router = express.Router();

router.post("/position", isLoggedIn, PositionController.createPosition);
router.get("/position", isLoggedIn, PositionController.getPosition);
router.get("/position/:id", isLoggedIn, PositionController.getPositionById);
router.put("/position/:id", isLoggedIn, PositionController.updatePositionById);
router.delete("/position/:id",isLoggedIn,PositionController.deletePositionById);

module.exports = router;
