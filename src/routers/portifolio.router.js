const express = require("express");
const router = express.Router();
const portifolioController = require("../controllers/portfolio.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10, 
  message: "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});
router.post("/portifolio",isLoggedIn,limiter,  portifolioController.createPortifolio);
router.get("/portifolio/:id",isLoggedIn,limiter, portifolioController.getPortifolios);
router.put("/portifolio/:id",isLoggedIn,limiter, portifolioController.updatePortifolio);
router.delete("/portifolio/:id",isLoggedIn,limiter, portifolioController.deletePortifolio);

module.exports = router;
