const express = require("express");
const router = express.Router();
const portifolioController = require("../controllers/portfolio.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");


router.post("/portifolio",isLoggedIn,  portifolioController.createPortifolio);
router.get("/portifolio/:id",isLoggedIn, portifolioController.getPortifolios);
router.put("/portifolio/:id",isLoggedIn, portifolioController.updatePortifolio);
router.delete("/portifolio/:id",isLoggedIn, portifolioController.deletePortifolio);

module.exports = router;
