const express = require("express");
const orderController = require("../controllers/order.controller");

const router = express.Router();

router.post("/order", orderController.createOrder);
router.get("/order", orderController.getOrders);
router.get("/order/:id", orderController.getOrderById);
router.put("/order/:id", orderController.updateOrder);
router.delete("/order/:id", orderController.deleteOrderById);
router.delete("/order", orderController.deleteOrder);
module.exports = router;
