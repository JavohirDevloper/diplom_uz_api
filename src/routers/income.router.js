const express = require("express");
const IncomesController = require("../controllers/incomes.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const router = express.Router();

router.post("/incomes", isLoggedIn, IncomesController.createIncome);
router.get("/incomes", isLoggedIn, IncomesController.getAllIncomes);
router.get("/incomes/:id", isLoggedIn, IncomesController.getIncomeById);
router.put("/incomes/:id", isLoggedIn, IncomesController.updateIncomeById);
router.delete("/incomes/:id", isLoggedIn, IncomesController.deleteIncomeById);

module.exports = router;
