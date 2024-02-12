const express = require("express");
const ViewsController = require("../controllers/views.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");

const router = express.Router();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10, 
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

router.get("/views", isLoggedIn, limiter, ViewsController.getViews);
router.get("/views/:id", isLoggedIn, limiter, ViewsController.getViewsId);
router.post("/views", isLoggedIn, limiter, ViewsController.createView);
router.delete("/views/:id", isLoggedIn, limiter, ViewsController.deleteViews);

module.exports = router;
