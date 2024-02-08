const express = require("express");
const orderController = require("../controllers/order.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");

const router = express.Router();

router.post("/order", isLoggedIn, orderController.createOrder);
router.get("/order", isLoggedIn, orderController.getOrders);
router.get("/order/:id", isLoggedIn, orderController.getOrderById);
router.put("/order/:id", isLoggedIn, orderController.updateOrder);
router.delete("/order/:id", isLoggedIn, orderController.deleteOrderById);
router.delete("/order", isLoggedIn, orderController.deleteOrder);
module.exports = router;
