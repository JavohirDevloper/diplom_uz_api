const express = require("express");
const IncomesController = require("../controllers/incomes.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10, 
  message: "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

router.post("/incomes", isLoggedIn,limiter, IncomesController.createIncome);
router.get("/incomes", isLoggedIn,limiter, IncomesController.getAllIncomes);
router.get("/incomes/:id", isLoggedIn,limiter, IncomesController.getIncomeById);
router.put("/incomes/:id", isLoggedIn,limiter, IncomesController.updateIncomeById);
router.delete("/incomes/:id", isLoggedIn,limiter, IncomesController.deleteIncomeById);

module.exports = router;
