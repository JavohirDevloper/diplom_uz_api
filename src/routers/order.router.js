const express = require("express");
const orderController = require("../controllers/order.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");

const router = express.Router();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10, 
  message: "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});
router.post("/order", isLoggedIn,limiter, orderController.createOrder);
router.get("/order", isLoggedIn,limiter, orderController.getOrders);
router.get("/order/:id", isLoggedIn,limiter, orderController.getOrderById);
router.put("/order/:id", isLoggedIn,limiter, orderController.updateOrder);
router.delete("/order/:id", isLoggedIn,limiter, orderController.deleteOrderById);
router.delete("/order", isLoggedIn,limiter, orderController.deleteOrder);
module.exports = router;
